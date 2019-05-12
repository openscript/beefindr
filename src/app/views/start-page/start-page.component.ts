import {Component, OnInit} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {InjectableBeehiveService} from '../../common/services/injectable-services.service';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.component.html',
  styleUrls: ['./start-page.component.scss'],
  providers: [InjectableBeehiveService, AngularFirestore]
})
export class StartPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
