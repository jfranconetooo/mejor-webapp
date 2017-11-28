import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { User } from './../domain/user';
import { SecurityService } from '../services/security.service';
import { UserService } from '../user/user.service';

@Injectable()
export class UserResolve implements Resolve<User> {

  constructor(
    private securityService: SecurityService,
    private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User>  {

    let id = this.securityService.getAuthenticatedUser()._id;

    return this.userService.get(id);
  }
}