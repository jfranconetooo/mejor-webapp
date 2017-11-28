import { User } from './../domain/user';
import { SecurityService } from './../services/security.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-admin',
  template: `
      <div class="alert alert-info alert-dismissable" *ngIf="alertOpen">
        <a class="panel-close close"  (click)="closeComponentAlert()" data-dismiss="alert">×</a> 
         <i class="fa fa-coffee"></i>
           Your data is incomplete, please <a class="complete-link" [routerLink]="['/app/perfil']">fill in</a> your name and email at least! 
      </div>
    <div class='fullscreenDiv'>
      <div class="center">Welcome @{{user.username}}</div>
    </div>​
    `,
  styleUrls: ['./home-admin.component.css']
})
export class HomeAdminComponent implements OnInit {

  user:User;
  alertOpen:boolean;

  constructor(private securityService: SecurityService) { 
    this.user = securityService.getAuthenticatedUser();
    this.alertOpen = !this.user.full_name || !this.user.email
  }

  ngOnInit() {
  }
 
  closeComponentAlert(){
    this.alertOpen = false;
  }
}
