import { FeatureSomosComponent } from './quienes-somos/feature-somos/feature-somos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { ComitesComponent } from './comites/comites.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  
  {
    path: 'home',
    component: HomeComponent,
    data: { role: ['user', 'admin'] },
    //canActivate: [GuardGuard],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: 'quienes-somos', component: FeatureSomosComponent },
  {
    path: 'servicios',
    loadChildren: () =>
      import('./servicios/servicios.Module').then((m) => m.ServiciosModule),
  },
  {
    path: 'capacitaciones',
    loadChildren: () =>
      import('./capacitaciones/capacitacion.Module').then(
        (m) => m.CapacitacionModule
      ),
  },
  { path: 'auth/login', component: LoginComponent },
  { path: 'comites', component: ComitesComponent },
  { path: 'auth/register', component: RegisterComponent },
  {
    path: 'normatividad',
    loadChildren: () =>
      import('./normativa/normativa.Module').then((m) => m.NormativaModule),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
