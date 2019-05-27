import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {HiveClaimPersistenceService} from '../../../common/services/hiveClaim-persistence.service';
import {HivePersistenceService} from 'src/app/common/services/hive-persistence.service';
import {Hive} from 'src/app/common/models/hive';
import {HiveClaim} from '../../../common/models/hiveClaim';


@Component({
  selector: 'app-show-hive',
  templateUrl: './show-hive.component.html',
  styleUrls: ['./show-hive.component.scss']
})
export class ShowHiveComponent implements OnInit {

  public hive: Hive;
  public hivePhoto: string;
  public claim: HiveClaim;


  public constructor(
    private route: ActivatedRoute,
    private hivePersistence: HivePersistenceService,
    private hiveClaimPersistence: HiveClaimPersistenceService
  ) {
  }

  private loadClaim() {
    // TODO: Use auth service to determine if we have a user/beekeeper
    this.route.queryParams.subscribe(queryPamars => {
      if (queryPamars.get('token')) {
        this.hiveClaimPersistence.getClaimForToken(queryPamars.get('token'))
          .then(hiveClaim => {
            this.claim = hiveClaim;
          });
      }
    });
  }

  public claimHive() {

  }

  public declineHive() {

  }

  public ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.get('uid')) {

        this.hivePersistence.get(params.get('uid')).subscribe((hive) => {
          this.hive = hive;
          if (this.hive.photo) {
            this.hivePersistence.download(this.hive.photo).subscribe((url) => {
              this.hivePhoto = url;
            });
          }

          this.loadClaim();
        });
      }
    });
  }

  public get googleMapsLink() {
    return `http://www.google.com/maps/place/${this.hive.location.latitude},${this.hive.location.longitude}`;
  }
}
