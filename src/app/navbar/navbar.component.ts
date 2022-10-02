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
  authentication: BehaviorSubject<boolean>;
  constructor(private authService: AuthenticationService, private router:Router) {
    this.authentication = new BehaviorSubject<boolean>(false);
  }

  ngOnInit(): void {
    this.authentication.next(this.authService.isAuthenticated());
    console.log(this.authentication.value)
  }

  singOut(){
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
