import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authentication:boolean;
  formulario!: FormGroup;
  constructor(private authService: AuthenticationService, private FormBuilder: FormBuilder,) {
    this.authentication=false;
    
   }

  ngOnInit(): void {
    this.authentication = this.authService.isAuthenticated(); 
    this.formulario = this.FormBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      messagge: ['', Validators.required],
    });
  }

}
