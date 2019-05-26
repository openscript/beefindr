import * as assert from "assert";
import {BeeHive} from "../../src/app/common/models/beehive.model";
import {BeekeeperUtils} from "../src/utils/beekeeper.utils";
import {BeeKeeper} from "../../src/app/common/models/beekeeper.model";


describe('Closest Beekeeper Function', () => {

  let keepers: BeeKeeper[] = [];

  beforeEach(() => {
    keepers = [
      new BeeKeeper({
        id: '1',
        firstname: 'Bellevue',
        location: {
          latitude: 47.367145,
          longitude: 8.544941,
        }
      }),
      new BeeKeeper({
        id: '2',
        firstname: 'Dolder',
        location: {
          latitude: 47.372643,
          longitude: 8.573327
        }
      })
    ];
  });

  it('check if closest available Beekeeper is selected', () => {

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
  });

  it('check if closest Beekeeper who declined hive is NOT selected', () => {

    const closest = BeekeeperUtils.selectClosestToHive(
      keepers,
      // Hive in Standbad Mythenquai 47.354244, 8.535547
      new BeeHive({
        location: {
          latitude: 47.354244,
          longitude: 8.535547
        },
        declinedBeekeeperUIDs: [
          '1'
        ]
      }));

    assert.notStrictEqual(closest, null);

    if (closest) {
      assert.strictEqual(
        closest.firstname, 'Dolder',
        'Expected Beekeeper at Bellevue to be selected as closest available Beekeeper for a ' +
        'hive at Strandbad Mythenquai, but Beekeeper \'' + closest.firstname + '\ was selected instead!'
      );
    }
  })
});
