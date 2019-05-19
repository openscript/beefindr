import { Routes } from '@angular/router';
import { HelloWorldComponent } from './app/views/hello-world/components/messages.component';
import { StartPageComponent } from './app/views/start-page/start-page.component';
import { AddHiveComponent } from './app/views/hive/add-hive/add-hive.component';
import { RegisterUserComponent } from './app/views/register-user/register-user.component';

export const appRoutes: Routes = [
  { path: '', component: StartPageComponent},
  { path: 'hive/add', component: AddHiveComponent},
  { path: 'user/add', component: RegisterUserComponent},
  { path: 'hello-world', component: HelloWorldComponent }
];
