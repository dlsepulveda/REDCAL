import { FeatureCapacitacionComponent } from './capacitaciones/feature-capacitacion/feature-capacitacion.component';
import { FeatureServiciosComponent } from './servicios/feature-servicios/feature-servicios.component';
import { FeatureSomosComponent } from './quienes-somos/feature-somos/feature-somos.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import {
  canActivate,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { GuardGuard } from './core/guard.guard';

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
  { path: 'servicios', component: FeatureServiciosComponent },
  { path: 'capacitaciones', component: FeatureCapacitacionComponent},
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
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
