import { Routes } from '@angular/router';
import { HelloWorldComponent } from './app/views/hello-world/components/messages.component';
import { StartPageComponent } from './app/views/start-page/start-page.component';
import { AddReportComponent } from './app/views/add-report/add-report.component';
import { RegisterUserComponent } from './app/views/register-user/register-user.component';

export const appRoutes: Routes = [
  { path: '', component: StartPageComponent },
  { path: 'add-report', component: AddReportComponent },
  { path: 'register-user', component: RegisterUserComponent },
  { path: 'hello-world', component: HelloWorldComponent }
];
