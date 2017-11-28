import { HomeAdminComponent } from './home-admin/home-admin.component';
import { LoginGuard } from './guards/login.guard';
import { LandPageComponent } from './land-page/land-page.component';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthResolve } from './resolvers/auth.resolve';
import { AuthGuard } from './guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { ConsultingComponent } from './consulting/consulting.component';
import { MainComponent } from './main.component';
import { UserResolve } from './resolvers/user.resolve';

const app_routes: Routes = [
  { path: '', component: LandPageComponent},
  { path: 'app', canActivate: [AuthGuard], resolve: {
    user: AuthResolve
  }, component: HomeComponent,
    children: [
      { path: '', component: HomeAdminComponent },
      { path: 'schedule-consulting', component: ConsultingComponent },
      { path: 'perfil', resolve:{user: UserResolve}, component: PerfilComponent }
    ]},
  { path: 'login', canActivate: [LoginGuard], component: LoginComponent },
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(app_routes);
