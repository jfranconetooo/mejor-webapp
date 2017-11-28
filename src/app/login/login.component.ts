import { SecurityService } from './../services/security.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  profile_picture: String = localStorage.getItem('lastAuthenticatedUserPicture') ? localStorage.getItem('lastAuthenticatedUserPicture') : 'http://www.eindhovenstartups.com/wp-content/uploads/bfi_thumb/blank_male_avatar-muuavt8qe29y8hsry4hp8wjs5udohb0xnjdmq5lr7w.jpg';
  
  constructor(private route: Router, private securitySercive: SecurityService) { }

  ngOnInit() {
    if(this.securitySercive.isAuthenticated()){
      this.route.navigate(['/app']);
    }
  }

}
