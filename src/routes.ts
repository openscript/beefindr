import { Routes } from '@angular/router';
import { HelloWorldComponent } from './app/views/hello-world/components/messages.component';
import { StartPageComponent } from './app/views/start-page/start-page.component';

export const appRoutes: Routes = [
  { path: '', component: StartPageComponent},
  { path: 'hello-world', component: HelloWorldComponent }
];
