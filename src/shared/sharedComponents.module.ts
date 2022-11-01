import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Angular Material
import { MatSliderModule } from '@angular/material/slider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,
  ],
  exports: [
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatCardModule,
    MatMenuModule,
    MatDividerModule,
    MatDialogModule,

  ]
})
export class SharedModule { }