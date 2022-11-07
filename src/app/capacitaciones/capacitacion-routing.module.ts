import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureCapacitacionComponent } from './feature-capacitacion/feature-capacitacion.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureCapacitacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapacitacionRoutingModule { }
