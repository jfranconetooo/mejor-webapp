import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';

import { User } from './../domain/user';
import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { SecurityService } from '../services/security.service';

@Injectable()
export class AuthResolve implements Resolve<User> {

  constructor(private authService: AuthService, private route:Router, private securityService: SecurityService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User>  {
    return this.authService.getAuthenticatedUser().map(user => {
      if (user) {
        this.securityService.setAuthenticatedUser(user);
        return user;
      } else { 
        this.securityService.clearAuthenticatedUser();
        this.route.navigate(['/login']);
        return null;
      }
    });
  }
}