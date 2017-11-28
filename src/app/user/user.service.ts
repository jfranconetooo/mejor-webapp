import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { User } from '../domain/user';
import { AppSettings } from './../app.settings';

@Injectable()
export class UserService {

  constructor(private http:HttpClient) { }

  get(_id){
    return this.http
    .get<User>(AppSettings.API_ENDPOINT + '/user/' + _id);
  }

  update(user:User){
    return this.http
    .put<User>(AppSettings.API_ENDPOINT + '/user/' + user._id, user);
  }
}
