import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private authenticatedService: AuthenticationService, private router: Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.authenticatedService.isAuthenticated()){
        if(this.authenticatedService.hasRoles(route.data['role'])){
          return true;
        }
        this.router.navigate(['/auth/register']);
        return true;
      }
      this.router.navigate(['/auth/login']);
      return false;
  }
  
}
