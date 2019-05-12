import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CardContainerComponent } from './card-container/card-container.component';

@NgModule({
  declarations: [
    CardContainerComponent
  ],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatToolbarModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatToolbarModule,
    CardContainerComponent,
  ]
})
export class ComponentsModule { }
