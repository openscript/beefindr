import {ClaimException} from "../exceptions/claim.exception";
import * as express from 'express';
import {ClaimExceptionType} from "../exceptions/claim-status.enum";


export class ClaimResponseUtil {

  /**
   * Create a nicely structured response for claim operations.
   * TODO: i18n
   * @param response
   * @param exception
   */
  public static createResponseForClaimException(response: express.Response, exception: ClaimException): express.Response {
    switch (exception.exceptionType) {
      case ClaimExceptionType.CLAIM_FULFILLED: {
        return response.status(200);
      }
      case ClaimExceptionType.INVALID_CLAIM_TOKEN: {
        return response.status(400).json({
          data: {
            details: {
              code: exception.exceptionType,
              verbose: 'Invalid token!'
            }
          }
        });
      }
      case ClaimExceptionType.ALREADY_CLAIMED: {
        return response.status(410).json({
          data: {
            details: {
              code: exception.exceptionType,
              verbose: 'This hive has already been claimed!'
            }
          }
        })
      }
    }
  }
}
