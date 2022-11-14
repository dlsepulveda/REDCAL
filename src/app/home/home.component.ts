import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  authentication:boolean;
  constructor(private authService: AuthenticationService) {
    this.authentication=false;
    
   }

  ngOnInit(): void {
    this.authentication = this.authService.isAuthenticated(); 
  }

}
