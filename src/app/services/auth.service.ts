import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from './../domain/user';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { SecurityService } from './security.service';
import { Promise } from 'q';


@Injectable()
export class AuthService {

  getAuthenticatedUser(){
     return this.http.get<User>(AppSettings.API_ENDPOINT + '/auth/authenticate');
  }

  logout(){
    this.http.get(AppSettings.API_ENDPOINT + '/auth/logout')
    .subscribe(()=> {
      this.securityService.clearAuthenticatedUser();
      this.router.navigate(['/login']);
    });
  }

  constructor(private securityService:SecurityService, private http: HttpClient, private router: Router) { }

}
