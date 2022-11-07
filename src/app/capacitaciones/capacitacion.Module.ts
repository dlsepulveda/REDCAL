import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureCapacitacionComponent } from './feature-capacitacion/feature-capacitacion.component';
import { SharedModule } from 'src/shared/sharedComponents.module';
import { CapacitacionRoutingModule } from './capacitacion-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [FeatureCapacitacionComponent],
  imports: [CommonModule, SharedModule, CapacitacionRoutingModule,FlexLayoutModule],
  providers: [],
})
export class CapacitacionModule {}
