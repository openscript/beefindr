import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatChipsModule
  ],
  exports: [
    MatToolbarModule,
    MatChipsModule
  ]
})
export class ComponentsModule { }
