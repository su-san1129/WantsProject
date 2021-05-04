import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'authenticate', component: AuthenticateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
