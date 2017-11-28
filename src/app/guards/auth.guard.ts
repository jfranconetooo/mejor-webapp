import { SecurityService } from './../services/security.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  canAuth:string = undefined;

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    if(route.queryParams.authenticated) this.canAuth = route.queryParams.authenticated;
    
    if(this.securityService.isAuthenticated()) return true;
    
    if(this.canAuth) {
      return true;
    }

    this.router.navigate(['/login']);
        
    return false;
  };
}
