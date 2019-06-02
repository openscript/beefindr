import HttpsError = firebase.functions.HttpsError;
import {ActivatedRoute} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {HiveClaimPersistenceService} from '../../../common/services/persistence/hiveClaim-persistence.service';
import {HiveClaim} from '../../../common/models/hiveClaim';
import {HivePersistenceService} from 'src/app/common/services/persistence/hive-persistence.service';
import {HiveModel} from 'src/app/common/models/hive';
import firebase from '@firebase/app';
import '@firebase/functions';


@Component({
  selector: 'app-show-hive',
  templateUrl: './show-hive.component.html',
  styleUrls: ['./show-hive.component.scss']
})
export class ShowHiveComponent implements OnInit {

  public hive: HiveModel;
  public hivePhoto: string;
  public claim: HiveClaim;


  public constructor(
    private route: ActivatedRoute,
    private hivePersistence: HivePersistenceService,
    private hiveClaimPersistence: HiveClaimPersistenceService
  ) {
  }

  /**
   * If a claim token is passed via query param, we can
   * try to load it from the database.
   * The claim (i.e. claim/decline buttons) is only presented to
   * the user if the claim has not been fulfilled yet.
   */
  private loadClaim() {
    this.route.queryParams.subscribe(queryParams => {
      if (queryParams.hasOwnProperty('token')) {
        this.hiveClaimPersistence.getClaimForToken(queryParams.token)
          .then(hiveClaim => {
            this.claim = !hiveClaim.claimed ? hiveClaim : this.claim;
          }).catch(error => {
          this.claim = null;
        });
      }
    });
  }

  /**
   * Calls the function to fulfill an offered claim
   */
  public claimHive(claim: boolean) {
    if (this.claim) {
      firebase.functions().httpsCallable((claim ? 'claimBeehive' : 'declineBeehive') + '?token=' + this.claim.token)({
        token: this.claim.token
      })
        .then(result => {
          this.claim = null;
          alert('Hive ' + (claim ? 'claimed' : 'declined'));
        })
        .catch((error: HttpsError) => {
          console.error(error.details);
        });
    }
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
