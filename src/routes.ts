import { Routes } from '@angular/router';
import { StartPageComponent } from './app/views/start-page/start-page.component';
import { AddHiveComponent } from './app/views/hive/add-hive/add-hive.component';
import { RegisterUserComponent } from './app/views/user/register-user/register-user.component';
import { ShowHiveComponent } from './app/views/hive/show-hive/show-hive.component';
import { LoginUserComponent } from './app/views/user/login-user/login-user.component';
import { DashboardUserComponent } from './app/views/user/dashboard-user/dashboard-user.component';
import { AuthGuard } from './app/common/services/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: StartPageComponent},
  { path: 'hive/add', component: AddHiveComponent},
  { path: 'hive/:uid', component: ShowHiveComponent},
  { path: 'user/add', component: RegisterUserComponent},
  { path: 'user/login', component: LoginUserComponent },
  { path: 'user/dashboard', component: DashboardUserComponent, canActivate: [AuthGuard]}
];
