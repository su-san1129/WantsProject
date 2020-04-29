import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginForm } from 'src/model/LoginForm';
import { Observable } from 'rxjs';
import { ResourcePath } from './resource-path';
import { RegisterForm } from 'src/model/registerForm';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url = 'http://localhost:8080/api/users';

  private HTTP_HEADERS = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private http: HttpClient) { }

  public login(loginForm: LoginForm): Observable<any> {
    const body = `mailAddress=${encodeURIComponent(loginForm.mailAddress)}&password=${encodeURIComponent(loginForm.password)}`;
    return this.http.post(`${ResourcePath.URL}/login`, body, {headers: this.HTTP_HEADERS});
  }

  public register(registerForm: RegisterForm): Observable<any> {
    return this.http.post(`${ResourcePath.USERS}/register`, registerForm);
  }
}
