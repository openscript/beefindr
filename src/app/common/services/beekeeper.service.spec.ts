import {BeekeeperService} from './beekeeper.service';
import {DummyFireStore} from './abstract-firestore-orm.service.spec';
import {BeeKeeper} from '../models/beekeeper.model';
import {BeeHive} from '../models/beehive.model';

describe('Beekeeper Service', () => {

  let beekeeperService: BeekeeperService;

  beforeEach((done) => {
    beekeeperService = new BeekeeperService(new DummyFireStore());

    // Beekeeper at Bellevue 47.367145, 8.544941
    beekeeperService.createItem(
      new BeeKeeper({
        firstname: 'Bellevue',
        location: {
          latitude: 47.367145,
          longitude: 8.544941,
        }
      })
    ).then(() => {
      beekeeperService.createItem(
        // Beekeeper at The Dolder Grand 47.372643, 8.573327
        new BeeKeeper({
          firstname: 'Dolder',
          location: {
            latitude: 47.372643,
            longitude: 8.573327
          }
        })
      ).then(() => {
        done();
      });
    });
  });

  it('check if closest available Beekeeper is selected', (done) => {

    beekeeperService.getClosestToHive(
      // Hive in Standbad Mythenquai 47.354244, 8.535547
      new BeeHive({
        location: {
          latitude: 47.354244,
          longitude: 8.535547
        }
      })).then(keeper => {
      expect(keeper.firstname).toBe(
        'Bellevue',
        'Expected Beekeeper at Bellevue to be selected as closest available Beekeeper for a ' +
        'hive at Strandbad Mythenquai, but Beekeeper \'' + keeper.firstname + '\ was selected instead!');
      done();
    });
  });
});
