import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

import { ToastrService } from 'ngx-toastr';
import { SecurityService } from './services/security.service';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  
  constructor(private toastr: ToastrService, private router: Router, public securityService:SecurityService){

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request to set withCredentials.
    const withCredentialsReq = req.clone({withCredentials: true});

    return next.handle(withCredentialsReq).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        let msg = event.headers.get('msg');
        if(msg) this.showMessageSuccess(msg);
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        switch(err.status){
          case 401: 
            this.securityService.clearAuthenticatedUser();
            this.router.navigate(['/login']);
            this.showUnauthorizedError();
            break;
          case 400:
            let error_msg = err.headers.get('error-msg');
            if(error_msg) this.showMessageError(error_msg);
            break;
          default:
            this.securityService.clearAuthenticatedUser();
            this.router.navigate(['']);
            break;  
        }
      }
    });
    
  }

  showUnauthorizedError(){
    this.toastr.error('Unauthorized!', 'Oops!');
  }

  showMessageError(msg){
    this.toastr.error(msg);
  }

  showMessageSuccess(msg){
    this.toastr.success(msg);
  }
}