import * as express from 'express';
import {ClaimExceptionType} from '../exceptions/claim-status.enum';
import {ClaimException} from '../exceptions/claim.exception';


export class ClaimResponseUtil {

  private static getResponseDetailsForExceptionType(exceptionType: ClaimExceptionType): { code: number, verbose: string } {
    switch (exceptionType) {
      case ClaimExceptionType.ALREADY_CLAIMED: {
        return {code: 410, verbose: 'This hive has already been claimed!'};
      }
      case ClaimExceptionType.INVALID_CLAIM_TOKEN: {
        return {code: 400, verbose: 'Invalid token!'};
      }
      default: {
        return {code: 500, verbose: 'Unknown Server Error'};
      }
    }
  }

  /**
   * Create a nicely structured response for claim operations.
   */
  public static createResponseForClaimException(response: express.Response, exception: ClaimException): express.Response {

    const details = ClaimResponseUtil.getResponseDetailsForExceptionType(exception.exceptionType);
    return response.status(details.code).json({
      data: {
        details: {
          code: exception.exceptionType,
          verbose: details.verbose
        }
      }
    });
  }
}
