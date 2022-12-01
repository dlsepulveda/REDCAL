import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUserData } from '../core/entity/user/user.module';
import { AuthenticationService } from '../Services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  autenticado: BehaviorSubject<IUserData> | undefined;
  constructor(private authService: AuthenticationService) {
    this.autenticado = this.authService.currentUserValue;
  }

  ngOnInit(): void {
    
  }
}
