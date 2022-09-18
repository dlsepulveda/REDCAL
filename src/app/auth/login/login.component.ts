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
  constructor(
    private fb: FormBuilder,
    readonly services: AuthenticationService,
    private router: Router
  ) {
    this.loading = false;
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login() {
    this.loading = true;
    if (this.form.invalid) {
      return;
    }

    this.services
      .login(this.form.value)
      .then(() => ((this.loading = false), this.router.navigate(['/home'])));
  }
}
