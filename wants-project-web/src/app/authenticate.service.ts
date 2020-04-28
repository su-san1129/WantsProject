import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginForm } from 'src/model/LoginForm';
import { Observable } from 'rxjs';
import { ResourcePath } from './resource-path';
import { RegisterForm } from 'src/model/registerForm';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  public login(loginForm: LoginForm): Observable<any> {
    return this.http.post(ResourcePath.USERS, loginForm);
  }

  public register(registerForm: RegisterForm): Observable<any> {
    return this.http.post(`${ResourcePath.USERS}/register`, registerForm);
  }
}
