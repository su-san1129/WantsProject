import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { AuthenticateGuard } from './authenticate.guard';
import { WishListComponent } from './wish-list/wish-list.component';
import { UserGroupComponent } from './user-group/user-group.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { UserGroupConfirmComponent } from './user-group-confirm/user-group-confirm.component';
import { RegisterUserFromGroupComponent } from './parts/register-user-from-group/register-user-from-group.component';
import { GroupConfirmGuard } from './group-confirm.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'wish', component: WishListComponent, canActivate: [AuthenticateGuard] },
  { path: 'user_group', component: UserGroupComponent, canActivate: [AuthenticateGuard] },
  { path: 'user_group_confirm', component: UserGroupConfirmComponent, canActivate: [AuthenticateGuard] },
  { path: 'authenticate', component: AuthenticateComponent },
  { path: 'authenticate_register/:id/:userId', component: RegisterUserFromGroupComponent, canActivate: [GroupConfirmGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
