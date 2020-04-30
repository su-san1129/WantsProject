import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginForm } from 'src/model/LoginForm';
import { Observable } from 'rxjs';
import { ResourcePath } from '../resource-path';
import { RegisterForm } from 'src/model/registerForm';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url = 'http://localhost:8080/api/users';

  private HTTP_HEADERS = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
  private AUTH_HEADER = new HttpHeaders({ Authorization: localStorage.getItem('authorization') });

  constructor(private http: HttpClient) { }

  public login(loginForm: LoginForm) {
    const body = `mailAddress=${encodeURIComponent(loginForm.mailAddress)}&password=${encodeURIComponent(loginForm.password)}`;
    return this.http.post(`${ResourcePath.URL}/login`, body, { headers: this.HTTP_HEADERS, withCredentials: true, observe: 'response' })
      .pipe(
        tap(
          response => {
            localStorage.setItem('authorization', response.headers.get('authorization'));
          }
        )
      );
  }

  public register(registerForm: RegisterForm): Observable<any> {
    return this.http.post(`${ResourcePath.USERS}/register`, registerForm);
  }

  public test(): void {
    // tslint:disable-next-line: max-line-length
    this.http.get(ResourcePath.USERS, {headers: this.AUTH_HEADER}).subscribe(respnse => console.log(respnse));
  }

  isAuthenticate(): boolean {
    return localStorage.getItem('authorization') !== null;
  }
}
