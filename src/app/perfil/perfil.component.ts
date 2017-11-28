import { ActivatedRoute } from '@angular/router';
import { SecurityService } from './../services/security.service';
import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../domain/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  user: User;
  ableAlert:boolean = true;

  constructor(private userService: UserService, 
    private securityService: SecurityService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.data
    .subscribe((data: { user: User }) => {
      this.user = data.user;
    });
  }
  
  closeContainerAlert(){
    this.ableAlert = false;
  }

  onSubmit(form){
    if(form.valid) {
      this.userService.update(this.user).subscribe(data => {
        this.user = data;
        this.securityService.setAuthenticatedUser(this.user);
      });
    };
  }
}
