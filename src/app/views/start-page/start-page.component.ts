import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BeeHive} from '../../common/models/beehive.model';
import {InjectableBeehiveService} from '../../common/services/injectable-services.service';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  providers: [InjectableBeehiveService, AngularFirestore]
})
export class StartPageComponent implements OnInit {

  constructor(private beeHiveService: InjectableBeehiveService) {
  }

  ngOnInit() {
  }

  public test() {
    this.beeHiveService.createItem(new BeeHive({
      location: {
        latitude: 41.2,
        longitude: 8.5
      }
    })).then(() => {
      console.log('created');
    });
    //
    // this.beeHiveService.listItems().subscribe(items => {
    //   for (const item of items) {
    //     console.log(item);
    //     console.log(item.getLocation());
    //     console.log(item.getLocation().latitude);
    //   }
    // })
  }
}
