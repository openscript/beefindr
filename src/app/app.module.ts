import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { HelloWorldModule } from './views/hello-world/hello-world.module';
import { AngularFirestoreModule, AngularFirestore} from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import { StartPageComponent } from './views/start-page/start-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PwaService} from './common/services/pwa.service';
import { AddHiveComponent } from './views/hive/add-hive/add-hive.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HivePersistenceService } from './common/services/hive-persistence.service';
import { ShowHiveComponent } from './views/hive/show-hive/show-hive.component';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';


@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    AddHiveComponent,
    RegisterUserComponent,
    ShowHiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HelloWorldModule,
    ServiceWorkerModule.register('workers.js', { enabled: environment.production }),
  ],
  providers: [
    AngularFirestore,
    HivePersistenceService,
    PwaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
