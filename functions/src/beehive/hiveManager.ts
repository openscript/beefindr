/**
 * Manages incoming claim/decline requests.
 * If a hive is claimed, it will be updated with the BeeKeepers id.
 * If a hive is declined, the next BeeKeeper will be notified and offered the hive.
 */
export class HiveManager {

  /**
   * Assigns a given hive to the BeeKeeper
   * @param token
   */
  public claimHive(token: string) {
    console.log('claimed');
  }

  /**
   * Notifies the next BeeKeeper in line.
   * @param token
   */
  public declineHive(token: string) {
    console.log('declined');
  }
}
