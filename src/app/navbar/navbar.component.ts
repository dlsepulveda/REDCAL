import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthenticationService, private router:Router) {
  }

  ngOnInit(): void {
    
  }

  singOut(){
    this.authService.logout().then(res=>{
      this.router.navigate(['auth/login']);
    });
    
  }
}
