import { NgModule } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CardContainerComponent } from './card-container/card-container.component';
import {MatSnackBarModule, MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    CardContainerComponent
  ],
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatInputModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatIconModule,
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatExpansionModule,
    MatInputModule,
    MatToolbarModule,
    CardContainerComponent,
    MatSnackBarModule,
    MatIconModule,
  ]
})
export class ComponentsModule { }
