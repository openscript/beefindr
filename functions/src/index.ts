import * as functions from 'firebase-functions';
import {BeeHive} from "../../src/app/common/models/beehive.model";
import {HiveNotifier} from "./notification/hiveNotifier";
import {LogDispatcher} from "./notification/dispatchers/log/log.dispatcher";
import * as admin from "firebase-admin";
import {MailDispatcher} from "./notification/dispatchers/email/mail.dispatcher";


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

admin.initializeApp();

/**
 * Triggered by Firestore onCreate-event, when a new BeeHive instance is created.
 * Creates a new HiveNotifier and notifies the BeeKeeper closest to the hive.
 */
export const handleNewBeehive = functions.firestore.document('beehive/{uid}').onCreate((snap, _) => {

  const notifier: HiveNotifier = new HiveNotifier([new LogDispatcher(), new MailDispatcher()]);
  notifier.notifyClosestBeekeeper(new BeeHive(snap.data()));

});
