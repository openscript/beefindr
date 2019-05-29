export interface HiveClaim {

  readonly id?: string;

  created: Date;
  updated: Date;

  hiveUid: string;
  keeperUid: string;
  token: string;
  claimed: boolean;
}
