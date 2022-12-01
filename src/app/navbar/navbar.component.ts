import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { IUserData } from '../core/entity/user/user.module';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
 
  @Input() user: any;
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
