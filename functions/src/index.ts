import * as admin from 'firebase-admin';
import * as express from 'express';
import * as functions from 'firebase-functions';
import {BeeHive, SerializedBeeHive} from '../../src/app/common/models/beehive.model';
import {ClaimException} from './common/claim/exceptions/claim.exception';
import {ClaimResponseUtil} from './common/claim/utils/claim-response.utils';
import {HiveManager} from './common/beehive/utils/HiveManager.utils';
import {HiveNotifier} from './notification/hiveNotifier';
import {LogDispatcher} from './notification/dispatchers/log/log.dispatcher';
import {MailDispatcher} from './notification/dispatchers/email/mail.dispatcher';
import {MessagingDispatcher} from './notification/dispatchers/firebase-cloud-messaging/messaging.dispatcher';


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript


admin.initializeApp();

const cors = require('cors')({origin: ['https://beefindr.firebaseapp.com']});

/**
 * Triggered by Firestore onCreate-event, when a new BeeHive instance is created.
 * Creates a new HiveNotifier and notifies the BeeKeeper closest to the beehive.
 */
export const handleNewBeehive = functions.firestore.document('beehive/{uid}').onCreate((snap, _) => {
  const notifier: HiveNotifier = new HiveNotifier([new LogDispatcher(), new MailDispatcher(), new MessagingDispatcher()]);
  return notifier.notifyClosestBeekeeper(new BeeHive(({id: snap.id, ...snap.data()} as SerializedBeeHive)));
});


const getToken = (req: functions.https.Request, res: express.Response) => {

  const token = req.query.token;

  if (!token) {
    res.status(400).send('No hive token provided or unable to parse token!');
    return null;
  }
  return token;
};

/**
 * Fulfills the claim on a beehive by a BeeKeeper.
 * A beehive-token is required to have access to the beehive.
 */
export const claimBeehive = functions.https.onRequest(async (req, res) => {

  cors(req, res, async () => {
    const token = getToken(req, res);

    if (token) {
      try {
        await HiveManager.claimHive(token);
        res.status(200).send({data: {}});
      } catch (e) {
        if (e instanceof ClaimException) {
          ClaimResponseUtil.createResponseForClaimException(res, e).send();
        } else {
          res.status(500).send(e);
        }
      }
    }
  });
});


/**
 * Waives claim for a given hive and keeper.
 * Updates the claim and notifies the next keeper in line (if available), otherwise dies silently.
 * A beehive-token is required to have access to the beehive.
 */
export const declineBeehive = functions.https.onRequest(async (req, res) => {

  cors(req, res, async () => {
    const token = getToken(req, res);

    if (token) {
      try {
        const hive: BeeHive = await HiveManager.declineHive(token);
        const notifier: HiveNotifier = new HiveNotifier([new LogDispatcher(), new MailDispatcher(), new MessagingDispatcher()]);
        notifier.notifyClosestBeekeeper(hive);
        res.status(200).send({data: {}});
      } catch (e) {
        if (e instanceof ClaimException) {
          ClaimResponseUtil.createResponseForClaimException(res, e).send();
        } else {
          res.status(500).send(e);
        }
      }
    }
  });
});
