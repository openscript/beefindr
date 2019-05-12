import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import {BeeKeeper} from "../../../../../src/app/common/models/beekeeper.model";
import {Dispatcher} from "../dispatcher.interface";
import {MailConfigurationException} from "./exceptions/mail-configuration.exception";


/**
 * Mail Dispatcher sending mails using nodemailer package.
 * In order to use it, set up an email address and configure
 * the app with attributes email.service, email.user and email.password.
 */
export class MailDispatcher implements Dispatcher {

  private static getTransportInfo(): { service: string, auth: { user: string, pass: string } } {
    const emailService: string = functions.config().email.service;
    const emailAddress: string = functions.config().email.address;
    const emailPassword: string = functions.config().email.password;

    if (emailService === null || emailAddress === null || emailPassword === null) {
      throw new MailConfigurationException(
        'No sender email address configured. Please make sure that you provide ' +
        'the app with a service name (e.g. hotmail), a login and a password using the CLI: ' +
        'firebase functions:config:set email.service="servicename" email.user="mylogin" email.password="mypassword".'
      );
    }

    return {
      service: emailService,
      auth: {
        user: emailAddress,
        pass: emailPassword
      }
    }
  }

  private sendMail(from: string, to: string, subject: string, text: string) {

    let transportInfo;

    try {
      transportInfo = MailDispatcher.getTransportInfo();
    } catch (e) {
      console.error(e);
      return;
    }

    const transport = nodemailer.createTransport(transportInfo);

    transport.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text
    }).then(() => {
      console.info('Email with subject ' + subject + ' successfully sent to ' + to);
    }).catch((err) => {
      console.error(err);
    });
  }

  public dispatchMessage(subject: string, body: string, recipient: BeeKeeper) {

    if (recipient.getEmail()) {
      this.sendMail(
        'beefinder@gmx.net',
        recipient.getEmail(),
        subject,
        body
      )
    } else {
      console.warn(
        'Unable to send email notification to BeeKeeper ' + recipient.id + '. No email address stored.'
      )
    }
  }
}
