import {environment} from '../../environments/environment';
const pckg = require('../../../package.json');

export class VersionUtil {
  public static getVersionString(): string {
    return pckg.version + (environment.production ? ' (prod)' : '');
  }
}
