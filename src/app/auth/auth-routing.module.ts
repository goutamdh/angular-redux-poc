import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './components/signin/signin.component';
import { PreventLoggedInAccessGuard } from '../core/guards/prevent-loggedin-access.guard';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


const routes: Routes = [{
  path: 'auth',
  component: AuthComponent,
  children: [
    { path: 'login', component: SigninComponent, canActivate: [PreventLoggedInAccessGuard] },
    { path: 'login', component: SigninComponent },
    { path: 'recover-password', component: RecoverPasswordComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
