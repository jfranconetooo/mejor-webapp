import { Injectable } from '@angular/core';

import { User } from './../domain/user';

@Injectable()
export class SecurityService {
  
  setAuthenticatedUser(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.lastAuthenticatedUserPicture = user.profile_picture;
  }

  getAuthenticatedUser():User {
    return  User.fromJson(JSON.parse(localStorage.getItem('user')));
  }

  isAuthenticated():boolean { 
    return localStorage.getItem('user') ? true : false;
  }

  clearAuthenticatedUser() { 
    localStorage.removeItem('user');
  }

  constructor() { }

}
