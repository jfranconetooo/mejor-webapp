import { Consulting } from './../domain/consulting';
import { SecurityService } from './../services/security.service';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppSettings } from './../app.settings';

@Injectable()
export class ConsultingService {

  constructor(private http:HttpClient, private securityService:SecurityService) { }

  save(consulting:Consulting){
    let user = this.securityService.getAuthenticatedUser();
    consulting.user=user;
    return this.http.post<Consulting>(AppSettings.API_ENDPOINT + '/consulting/schedule', consulting);
  }

  getEnabledDates(): Observable<DateReponse>{
     return this.http
    .get<DateReponse>(AppSettings.API_ENDPOINT + '/consulting/dates-enabled');
  }
  
  getUnAvailableDates():Observable<string[]>{
    return this.http.get<string[]>(AppSettings.API_ENDPOINT + '/consulting/dates-unavailable');
  }

 getMyConsultings(): Observable<Consulting[]>{
  let user = this.securityService.getAuthenticatedUser();
  return this.http
  .post<Consulting[]>(AppSettings.API_ENDPOINT + '/consulting/my-consultings', {userId: user._id});
 }

 delete(_id:String){
   return this.http.delete(AppSettings.API_ENDPOINT + '/consulting/'+_id+'/uncheck');
 }
}

interface DateReponse {
  dates_enableds:string[],
  hours_enableds:number[]
}