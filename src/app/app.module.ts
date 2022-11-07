import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/sharedComponents.module';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { FeatureServiciosComponent } from './servicios/feature-servicios/feature-servicios.component';
import { FeatureCapacitacionComponent } from './capacitaciones/feature-capacitacion/feature-capacitacion.component';
import { FeatureSomosComponent } from './quienes-somos/feature-somos/feature-somos.component';
import { UploadServiceComponent } from './servicios/ui/upload-service/upload-service.component';
import { FirebaseService } from './Services/firebase.service';
import { AuthenticationService } from './Services/authentication.service';
import { UploadCapacitacionComponent } from './capacitaciones/ui/upload-capacitacion/upload-capacitacion.component';
import { NormativaComponent } from './normativa/normativa.component';
import { ErrorMessageService } from './Services/error-message.service';
import { InscribirComponent } from './capacitaciones/ui/inscribir/inscribir.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    FeatureServiciosComponent,
    FeatureSomosComponent,
    UploadServiceComponent,
    UploadCapacitacionComponent,
    NormativaComponent,
    InscribirComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AppRoutingModule,
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    AngularFireModule.initializeApp(environment.firebase),
    provideAuth(() => getAuth()),
    AngularFirestoreModule, 
  ],
  providers: [FirebaseService, AuthenticationService, ErrorMessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
