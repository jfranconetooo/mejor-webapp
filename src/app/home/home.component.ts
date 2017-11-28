import { SecurityService } from './../services/security.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: ActivatedRoute, private securityService: SecurityService,
    private authService:AuthService) { }

  ngOnInit() {
    if(!this.securityService.isAuthenticated()){
      this.authService.getAuthenticatedUser().subscribe(data => this.securityService.setAuthenticatedUser(data));
    }
  }

}
