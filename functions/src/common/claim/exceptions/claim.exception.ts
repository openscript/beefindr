import {ClaimExceptionType} from "./claim-status.enum";

export class ClaimException extends Error {

  public exceptionType: ClaimExceptionType;

  public constructor(exceptionType: ClaimExceptionType) {
    super('');
    this.exceptionType = exceptionType;
  }
}
