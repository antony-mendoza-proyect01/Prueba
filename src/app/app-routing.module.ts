import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './core/interceptor/guards/auth.guard';
import { UserComponent } from './modules/user/user.component';
import { AreaComponent } from './modules/area/area.component';

const routes: Routes = [
  { path: '', redirectTo: '/Login', pathMatch: 'full' },
  { path: 'Login', component: LoginComponent },
  { path: 'Home', component: HomeComponent, canActivate: [AuthGuard] }, 
  { path: 'Area', component: AreaComponent, canActivate: [AuthGuard] }, // Protege la ruta
  { path: 'User', component: UserComponent, canActivate: [AuthGuard] }, // Protege la ruta

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
