import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Hive } from 'src/app/common/models/hive';
import { HivePersistenceService } from 'src/app/common/services/hive-persistence.service';

@Component({
  selector: 'app-show-hive',
  templateUrl: './show-hive.component.html',
  styleUrls: ['./show-hive.component.scss']
})
export class ShowHiveComponent implements OnInit {

  public hive: Hive;
  public hivePhoto: string;

  public constructor(
    private route: ActivatedRoute,
    private hivePersistence: HivePersistenceService
  ) { }

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
        });
      }
    });
  }

  public get googleMapsLink() {
    return `http://www.google.com/maps/place/${this.hive.location.latitude},${this.hive.location.longitude}`;
  }

}
