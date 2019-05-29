import { Routes } from '@angular/router';
import { HelloWorldComponent } from './app/views/hello-world/components/messages.component';
import { StartPageComponent } from './app/views/start-page/start-page.component';
import { AddHiveComponent } from './app/views/hive/add-hive/add-hive.component';
import { RegisterUserComponent } from './app/views/user/register-user/register-user.component';
import { ShowHiveComponent } from './app/views/hive/show-hive/show-hive.component';
import { LoginUserComponent } from './app/views/user/login-user/login-user.component';
import { DashboardBeekeeperComponent } from './app/views/dashboard-beekeeper/dashboard-beekeeper.component';
import { AuthGuard } from './app/common/services/auth.guard';

export const appRoutes: Routes = [
  { path: '', component: StartPageComponent},
  { path: 'hive/add', component: AddHiveComponent},
  { path: 'hive/:uid', component: ShowHiveComponent},
  { path: 'user/add', component: RegisterUserComponent},
  { path: 'login-user', component: LoginUserComponent },
  { path: 'dashboard-beekeeper', component: DashboardBeekeeperComponent, canActivate: [AuthGuard]},
  { path: 'hello-world', component: HelloWorldComponent }
];
