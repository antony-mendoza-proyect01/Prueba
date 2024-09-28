import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './core/interceptor/guards/auth.guard';
import { UserComponent } from './modules/user/user.component';
import { AreaComponent } from './modules/area/area.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] }, 
  { path: 'Area', component: AreaComponent, canActivate: [AuthGuard] }, 
  { path: 'User', component: UserComponent, canActivate: [AuthGuard] }, 
  { path: 'Dashboard', component: DashboardComponent, canActivate: [AuthGuard] }, 
  { path: '**', component: HomeComponent, canActivate: [AuthGuard] }, 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
