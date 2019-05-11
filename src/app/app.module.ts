import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { HelloWorldModule } from './views/hello-world/hello-world.module';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentsModule } from './components/components.module';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import { StartPageComponent } from './views/start-page/start-page.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AddReportComponent } from './views/add-report/add-report.component';
import { RegisterUserComponent } from './views/register-user/register-user.component';


@NgModule({
  declarations: [
    AppComponent,
    StartPageComponent,
    AddReportComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(
      appRoutes
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    BrowserAnimationsModule,
    ComponentsModule,
    HelloWorldModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
