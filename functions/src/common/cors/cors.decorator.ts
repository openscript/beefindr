import * as express from 'express';
import * as functions from 'firebase-functions';


/**
 * Wraps the inner function into a cors
 */
export const CORSSwitchDecorator = (req: functions.https.Request, res: express.Response, inner: CallableFunction) => {

  if (functions.config().cors && functions.config().cors.enabled) {

    const cors = require('cors')({origin: true});

    return cors(req, res, () => {
      return new Promise(async (s, e) => {
        inner();
      });
    });
  } else {
    return inner();
  }
};
