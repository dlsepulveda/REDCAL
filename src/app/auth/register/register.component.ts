import { FirebaseService } from './../../Services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  loading: boolean;
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    readonly services: AuthenticationService,
    private router: Router,
   
  ) {
    this.loading = false;
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  register() {
    this.loading = true;
    if (this.form.invalid) {
      return;
    }

    this.services
      .register(this.form.value)
      .then((uid) => {
        //this.firebaseService.create()
      });
  }

}
