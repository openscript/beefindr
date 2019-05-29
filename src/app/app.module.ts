import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { RegisterUserComponent } from './views/user/register-user/register-user.component';
import { HivePersistenceService } from './common/services/hive-persistence.service';
import { ShowHiveComponent } from './views/hive/show-hive/show-hive.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LoginUserComponent } from './views/user/login-user/login-user.component';
import { DashboardBeekeeperComponent } from './views/dashboard-beekeeper/dashboard-beekeeper.component';
import { AuthService } from './common/services/auth.service';
import { NotifyService } from './common/services/notify.service';
import { NotificationMessageComponent } from './views/notification-message/notification-message.component';

@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    AddHiveComponent,
    RegisterUserComponent,
    ShowHiveComponent,
    RegisterUserComponent,
    LoginUserComponent,
    DashboardBeekeeperComponent,
    NotificationMessageComponent
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
    PwaService,
    AuthService,
    NotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
