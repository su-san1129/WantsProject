import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResourcePath } from '../resource-path';
import { tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { RegisterPreUserForm } from '../form/register-pre-user-form';
import { LoginForm } from '../form/login-form';
import { RegisterForm } from '../form/register-form';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  url = 'http://localhost:8080/api/users';

  private HTTP_HEADERS = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private http: HttpClient, private route: Router, private activatedRoute: ActivatedRoute) { }

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
    this.http.get(ResourcePath.USERS).subscribe(response => console.log(response));
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

  get userId() {
    return this.decodeJWT().sub;
  }

  get token() {
    return localStorage.getItem('authorization');
  }

  logout(): void {
    localStorage.removeItem('authorization');
    this.route.navigate(['/login']);
  }

  registerMainRegistration() {
    const id = this.activatedRoute.snapshot.queryParamMap.get('validateId');
    console.log(id);
    console.log(this.activatedRoute.snapshot);
    return this.http.post(`${ResourcePath.USERS}/register/main_registration`, { validateId: id });
  }

  public registerPreUser(registerForm: RegisterPreUserForm): Observable<any> {
    return this.http.post(`${ResourcePath.USERS}/register/main_registration/pre_user`, registerForm);
  }
}
