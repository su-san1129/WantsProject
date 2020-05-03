import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginForm } from 'src/model/LoginForm';
import { Observable } from 'rxjs';
import { ResourcePath } from '../resource-path';
import { RegisterForm } from 'src/model/registerForm';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url = 'http://localhost:8080/api/users';

  private HTTP_HEADERS = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private http: HttpClient, private route: Router) { }

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
    this.decodeJWT();
    this.http.get(ResourcePath.USERS).subscribe(respnse => console.log(respnse));
  }

  isAuthenticate(): boolean {
    return localStorage.getItem('authorization') !== null;
  }

  public isExpire(): boolean  {
    if (this.decodeJWT() == null) {
      return;
    }
    const expire = this.decodeJWT().exp * 1000;
    const today = new Date().getTime();
    console.log('expire : ', expire, ' today : ', today);
    return expire >= today;
  }

  private decodeJWT() {
    if (!this.token) {
      return null;
    }

    const base64Url = this.token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decode = JSON.parse(decodeURIComponent(escape(window.atob(base64))));
    return decode;
  }

  get token() {
    return localStorage.getItem('authorization');
  }

  logout(): void {
    localStorage.removeItem('authorization');
    this.route.navigate(['/login']);
  }
}
