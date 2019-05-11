import * as nodemailer from 'nodemailer';
import * as functions from 'firebase-functions';
import {Dispatcher} from "../dispatcher.interface";
import {BeeKeeper} from "../../../../src/app/common/models/beekeeper.model";

/**
 * WIP, DO NOT USE!
 */
export class MailDispatcher implements Dispatcher {

  private getTransportInfo(): any {
    const emailService: string = functions.config().email.service;
    const emailAddress: string = functions.config().email.address;
    const emailPassword: string = functions.config().email.password;

    if (emailService === null) {
      console.error('no');
      return null;
    }

    return {
      service: emailService,
      auth: {
        user: emailAddress,
        pass: emailPassword
      }
    }
  }

  public sendMail(from: string, to: string, subject: string, text: string) {

    const transportInfo = this.getTransportInfo();

    if (transportInfo === null) {
      return;
    }

    const transport = nodemailer.createTransport(transportInfo);

    transport.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text
    }).then(() => {console.log('email sent')}).catch(() => {
      console.error('email could not be sent')
    })
  }

  public dispatchMessage(subject: string, body: string, recipient: BeeKeeper) {
    // this.sendMail(
    //
    // )
  }
}
