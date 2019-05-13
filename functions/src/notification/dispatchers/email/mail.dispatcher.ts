import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import {BeeKeeper} from "../../../../../src/app/common/models/beekeeper.model";
import {Dispatcher} from "../dispatcher.interface";
import {MailConfigurationException} from "./exceptions/mail-configuration.exception";


/**
 * Mail Dispatcher sending mails using nodemailer package.
 * In order to use it, set up an email address and configure
 * the app with attributes email.service, email.address and email.password.
 *
 * IMPORTANT NOTE: In order to send emails from a firebase hosting,
 * make sure you use a Gmail account, as only Google-owned services are allowed to be contacted
 * within the free 'spark' plan. See https://stackoverflow.com/questions/53562234/sending-e-mail-through-firebase-functions/53565992#53565992
 */
export class MailDispatcher implements Dispatcher {

  /**
   * Retrieves email service details from config
   */
  private static getTransportInfo(): { service: string, auth: { user: string, pass: string } } {
    const emailService: string = functions.config().email.service;
    const emailAddress: string = functions.config().email.address;
    const emailPassword: string = functions.config().email.password;

    if (emailService === null || emailAddress === null || emailPassword === null) {
      throw new MailConfigurationException(
        'No sender email address configured. Please make sure that you provide ' +
        'the app with a service name (e.g. hotmail), a login and a password using the CLI: ' +
        'firebase functions:config:set email.service="servicename" email.address="myemail" email.password="mypassword".'
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

  private static renderExtraPayload(message: string, extraPayload: any): string {

    let rendered = message;
    if (extraPayload.hasOwnProperty('link')) {
      rendered += '\n\n';
      rendered += extraPayload.link

    }

    return rendered;
  }

  private sendMail(to: string, subject: string, text: string) {

    let transportInfo;

    try {
      transportInfo = MailDispatcher.getTransportInfo();
    } catch (e) {
      console.error(e);
      return;
    }

    const transport = nodemailer.createTransport(transportInfo);

    transport.sendMail({
      from: transportInfo.auth.user,
      to: to,
      subject: subject,
      text: text
    }).then(() => {
      console.info('Email with subject ' + subject + ' successfully sent to ' + to);
    }).catch((err) => {
      console.error(err);
    });
  }

  public dispatchMessage(recipient: BeeKeeper, subject: string, body: string, extraPayload?: any) {

    if (recipient.getEmail()) {
      this.sendMail(recipient.getEmail(), subject, MailDispatcher.renderExtraPayload(body, extraPayload))
    } else {
      console.warn(
        'Unable to send email notification to BeeKeeper ' + recipient.id + '. No email address stored.'
      )
    }
  }
}
