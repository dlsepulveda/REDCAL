import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/sharedComponents.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FeatureServiciosComponent } from './feature-servicios/feature-servicios.component';
import { ServiciosRoutingModule } from './servicios-routing.module';

@NgModule({
  declarations: [FeatureServiciosComponent],
  imports: [
    CommonModule,
    SharedModule,
    ServiciosRoutingModule,
    FlexLayoutModule,
  ],
  providers: [],
})
export class ServiciosModule {}
