import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeatureServiciosComponent } from './feature-servicios/feature-servicios.component';

const routes: Routes = [
  {
    path: '',
    component: FeatureServiciosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiciosRoutingModule { }
