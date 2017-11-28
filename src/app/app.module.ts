import { MainComponent } from './main.component';
import { AppHttpInterceptor } from './app.http.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule }   from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppComponent } from './app.component';
import { TopNavBarComponent } from './top-nav-bar/top-nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';
import { AuthService } from './services/auth.service';
import { SecurityService } from './services/security.service';
import { AuthResolve } from './resolvers/auth.resolve';
import { AuthGuard } from './guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { ConsultingComponent } from './consulting/consulting.component';
import { UserService } from './user/user.service';
import { ToastrModule } from 'ngx-toastr'; 
import { UserResolve } from './resolvers/user.resolve';
import {A2Edatetimepicker} from 'ng2-eonasdan-datetimepicker';
import { ConsultingService } from './consulting/consulting.service';
import { LandPageComponent } from './land-page/land-page.component';
import { LoginGuard } from './guards/login.guard';
import { MomentModule } from 'angular2-moment';
import { ModalModule } from 'ngx-modialog';
import { BootstrapModalModule } from 'ngx-modialog/plugins/bootstrap';
import { HomeAdminComponent } from './home-admin/home-admin.component';


@NgModule({
  declarations: [
    AppComponent,
    TopNavBarComponent,
    FooterComponent,
    LoginComponent,
    HomeComponent,
    PerfilComponent,
    ConsultingComponent,
    MainComponent,
    LandPageComponent,
    HomeAdminComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    A2Edatetimepicker,
    MomentModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule
  ],
  providers: [AuthService, 
    SecurityService, 
    AuthResolve, 
    UserResolve,
    UserService,
    AuthGuard,
    LoginGuard,
    ConsultingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
