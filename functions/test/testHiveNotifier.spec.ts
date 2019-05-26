import * as assert from "assert";
import {BeeHive} from "../../src/app/common/models/beehive.model";
import {BeekeeperUtils} from "../src/utils/beekeeper.utils";
import {BeeKeeper} from "../../src/app/common/models/beekeeper.model";


describe('Closest Beekeeper Function', () => {

  it('check if closest available Beekeeper is selected', () => {

    const keepers: BeeKeeper[] = [
      new BeeKeeper({
        firstname: 'Bellevue',
        location: {
          latitude: 47.367145,
          longitude: 8.544941,
        }
      }),
      new BeeKeeper({
        firstname: 'Dolder',
        location: {
          latitude: 47.372643,
          longitude: 8.573327
        }
      })
    ];

    const closest = BeekeeperUtils.selectClosestToHive(
      keepers,
      // Hive in Standbad Mythenquai 47.354244, 8.535547
      new BeeHive({
        location: {
          latitude: 47.354244,
          longitude: 8.535547
        }
      }));

    assert.notStrictEqual(closest, null);

    if (closest) {
      assert.strictEqual(
        closest.firstname, 'Bellevue',
        'Expected Beekeeper at Bellevue to be selected as closest available Beekeeper for a ' +
        'hive at Strandbad Mythenquai, but Beekeeper \'' + closest.firstname + '\ was selected instead!'
      );
    }
  })
});
