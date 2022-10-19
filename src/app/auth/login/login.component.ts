import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loading: boolean;
  form: FormGroup;
  error_message:string;
  constructor(
    private fb: FormBuilder,
    readonly services: AuthenticationService,
  ) {
    this.loading = false;
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.error_message='';
  }

  ngOnInit(): void {}

  login() {
    this.loading = true;
    if (this.form.invalid) {
      return;
    }

    this.services
      .login(this.form.value)
      .then(() => ((this.loading = false) ))
      .catch(error=>{
        this.loading = false;
        if (error.code === 'auth/invalid-email') {
          this.error_message =  'Correo Invalido'
        } else if(error.code === 'auth/user-disabled') {
          this.error_message = 'Usuario Desabilitado'
        } else if(error.code === 'auth/user-not-found') {
          this.error_message = 'Usuario No Registrado'
        } else if(error.code === 'auth/wrong-password') {
          this.error_message = 'Contraseña Erronea'
        } else if (error.code === 'auth/too-many-requests') {
          this.error_message = 'Exceso de intentos'
        } else {
          this.error_message = error.code
        }
      });
  }
}
