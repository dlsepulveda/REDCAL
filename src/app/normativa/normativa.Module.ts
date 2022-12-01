import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/sharedComponents.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NormativaRoutingModule, } from './normativa-routing.module';
import { NormativaComponent } from './normativa.component';

@NgModule({
  declarations: [NormativaComponent],
  imports: [
    CommonModule,
    SharedModule,
    NormativaRoutingModule,
    FlexLayoutModule,
  ],
  providers: [],
})
export class NormativaModule {}
