import { Routes } from '@angular/router';
import { StartPageComponent } from './app/views/start-page/start-page.component';
import { AddHiveComponent } from './app/views/hive/add-hive/add-hive.component';
import { RegisterUserComponent } from './app/views/user/register-user/register-user.component';
import { ShowHiveComponent } from './app/views/hive/show-hive/show-hive.component';
import { LoginUserComponent } from './app/views/user/login-user/login-user.component';
import { DashboardUserComponent } from './app/views/user/dashboard-user/dashboard-user.component';
import { AuthenticationActivate } from './app/utils/authentication-activate';
import { DashboardActivate } from './app/utils/dashboard-activate';

export const appRoutes: Routes = [
  { path: '', component: StartPageComponent, canActivate: [DashboardActivate] },
  { path: 'hive/add', component: AddHiveComponent },
  { path: 'hive/:uid', component: ShowHiveComponent },
  { path: 'user/add', component: RegisterUserComponent, canActivate: [DashboardActivate] },
  { path: 'user/login', component: LoginUserComponent, canActivate: [DashboardActivate] },
  { path: 'user/dashboard', component: DashboardUserComponent, canActivate: [AuthenticationActivate] }
];
