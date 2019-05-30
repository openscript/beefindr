import * as assert from "assert";
import {BeekeeperUtils} from "../src/common/beekeeper/utils/beekeeper.utils";
import {KeeperModel} from "../../src/app/common/models/keeper";


describe('Closest Beekeeper Function', () => {

  let keepers: KeeperModel[] = [];

  beforeEach(() => {
    keepers = [{
        uid: '1',
        name: 'Bellevue',
        email: 'bellevue@example.com',
        location: {
          latitude: 47.367145,
          longitude: 8.544941,
          accuracy: 0
        }
      }, {
        uid: '2',
        name: 'Dolder',
        email: 'dolder@example.com',
        location: {
          latitude: 47.372643,
          longitude: 8.573327,
          accuracy: 0
        }
      }
    ];
  });

  it('check if closest available Beekeeper is selected', () => {

    const closest = BeekeeperUtils.selectClosestToHive(
      keepers,
      // Hive in Standbad Mythenquai 47.354244, 8.535547
      {
        finder: {
          name: 'Hans Wurst',
          email: 'hans.wurst@example.com'
        },
        location: {
          latitude: 47.354244,
          longitude: 8.535547,
          accuracy: 0
        }
      });

    assert.notStrictEqual(closest, null);

    if (closest) {
      assert.strictEqual(
        closest.name, 'Bellevue',
        'Expected Beekeeper at Bellevue to be selected as closest available Beekeeper for a ' +
        'hive at Strandbad Mythenquai, but Beekeeper \'' + closest.name + '\ was selected instead!'
      );
    }
  });

  it('check if closest Beekeeper who declined hive is NOT selected', () => {

    const closest = BeekeeperUtils.selectClosestToHive(
      keepers,
      // Hive in Standbad Mythenquai 47.354244, 8.535547
      {
        finder: {
          name: 'Hans Wurst',
          email: 'hans.wurst@example.com'
        },
        location: {
          latitude: 47.354244,
          longitude: 8.535547,
          accuracy: 0
        }
      });

    assert.notStrictEqual(closest, null);

    if (closest) {
      assert.strictEqual(
        closest.name, 'Dolder',
        'Expected Beekeeper at Bellevue to be selected as closest available Beekeeper for a ' +
        'hive at Strandbad Mythenquai, but Beekeeper \'' + closest.name + '\ was selected instead!'
      );
    }
  })
});
