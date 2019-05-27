import * as admin from "firebase-admin";
import * as functions from 'firebase-functions';
import {BeeHive, SerializedBeeHive} from "../../src/app/common/models/beehive.model";
import {HiveNotifier} from "./notification/hiveNotifier";
import {LogDispatcher} from "./notification/dispatchers/log/log.dispatcher";
import {MailDispatcher} from "./notification/dispatchers/email/mail.dispatcher";
import {MessagingDispatcher} from "./notification/dispatchers/firebase-cloud-messaging/messaging.dispatcher";
import {HiveManager} from "./beehive/hiveManager";


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

/**
 * Triggered by Firestore onCreate-event, when a new BeeHive instance is created.
 * Creates a new HiveNotifier and notifies the BeeKeeper closest to the hive.
 */
export const handleNewBeehive = functions.firestore.document('beehive/{uid}').onCreate((snap, _) => {
  const notifier: HiveNotifier = new HiveNotifier([new LogDispatcher(), new MailDispatcher(), new MessagingDispatcher()]);
  return notifier.notifyClosestBeekeeper(new BeeHive((<SerializedBeeHive>{id: snap.id, ...snap.data()})));
});

/**
 * Fulfills the claim on a hive by a BeeKeeper.
 * A hive-token is required to have access to the hive.
 */
export const claimBeehive = functions.https.onRequest(async (req, res) => {

    const token = req.query.token;

    if (!token) {
      res.status(400).send('No hive token provided or unable to parse token!');
      return;
    }

    try {
      (new HiveManager).claimHive(token);
    } catch (e) {
      res.status(400).send(e);
    }
    res.status(200).send();
  }
);

/**
 * Fulfills the claim on a hive by a BeeKeeper.
 * A hive-token is required to have access to the hive.
 */
export const declineBeehive = functions.https.onRequest(async (req, res) => {

    const token = req.query.token;

    if (!token) {
      res.status(400).send('No hive token provided or unable to parse token!');
      return;
    }

    try {
      (new HiveManager).declineHive(token);
    } catch (e) {
      res.status(400).send(e);
    }
    res.status(200).send();
  }
);
