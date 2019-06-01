import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';
import {KeeperModel} from '../../../../../src/app/common/models/keeper';
import {Dispatcher} from '../dispatcher.interface';
import {MailConfigurationException} from './exceptions/mail-configuration.exception';


/**
 * Mail Dispatcher sending mails using nodemailer package.
 * In order to use it, set up an email address and configure
 * the app with attributes email.service, email.address and email.password.
 *
 * IMPORTANT NOTE: In order to send emails from a firebase hosting,
 * make sure you use a Gmail account, as only Google-owned services are allowed to be contacted
 * within the free 'spark' plan.
 * See https://stackoverflow.com/questions/53562234/sending-e-mail-through-firebase-functions/53565992#53565992
 */
export class MailDispatcher implements Dispatcher {

  /**
   * Retrieves email service details from config
   */
  private static getTransportInfo(): { service: string, auth: { user: string, pass: string } } {

    if (
      !functions.config().email ||
      !functions.config().email.service ||
      !functions.config().email.address ||
      !functions.config().email.password) {
      throw new MailConfigurationException(
        'No sender email address configured. Please make sure that you provide ' +
        'the app with a service name (e.g. hotmail), a login and a password using the CLI: ' +
        'firebase functions:config:set email.service="servicename" email.address="myemail" email.password="mypassword".'
      );
    }

    const emailService: string = functions.config().email.service;
    const emailAddress: string = functions.config().email.address;
    const emailPassword: string = functions.config().email.password;

    return {
      service: emailService,
      auth: {
        user: emailAddress,
        pass: emailPassword
      }
    };
  }

  private static renderExtraPayload(message: string, extraPayload: any): string {

    let rendered = message;
    if (extraPayload.hasOwnProperty('link')) {
      rendered += '\n\n';
      rendered += extraPayload.link;
    }

    return rendered;
  }

  private async sendMail(to: string, subject: string, text: string) {

    let transportInfo;

    try {
      transportInfo = MailDispatcher.getTransportInfo();
    } catch (e) {
      console.error(e);
      return;
    }

    const transport = nodemailer.createTransport(transportInfo);

    return transport.sendMail({
      from: transportInfo.auth.user,
      to,
      subject,
      text,
    });
  }

  public async dispatchMessage(recipient: KeeperModel, subject: string, body: string, extraPayload?: any) {

    if (recipient.email) {
        return this.sendMail(recipient.email, subject, MailDispatcher.renderExtraPayload(body, extraPayload));
    } else {
      return Promise.reject(
        'Unable to send email notification to BeeKeeper ' + recipient.uid + '. No email address stored.'
      );
    }
  }
}
