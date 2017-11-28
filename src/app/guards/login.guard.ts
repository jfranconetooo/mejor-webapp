import { SecurityService } from './../services/security.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class LoginGuard implements CanActivate {

  canAuth:string = undefined;

  constructor(
    private securityService: SecurityService,
    private route: Router
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {

    if(this.securityService.isAuthenticated()){
      this.route.navigate(['/app']);
      return false;
    }
    return true;
  };
}
