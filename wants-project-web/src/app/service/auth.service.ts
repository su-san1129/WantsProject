import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginForm, RegisterForm } from '../model/form';
import { ResourcePath } from '../resource-path';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = 'http://localhost:8080/api/users';

  private HTTP_HEADERS = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

  constructor(private http: HttpClient, private route: Router, private activatedRoute: ActivatedRoute) { }


  /**====== http-request =====*/
  public login(loginForm: LoginForm) {
    const body = `email=${encodeURIComponent(loginForm.email)}&password=${encodeURIComponent(loginForm.password)}`;
    return this.http.post(
      `${ResourcePath.URL}/login`,
      body,
      { headers: this.HTTP_HEADERS, withCredentials: true, observe: 'response' }
    ).pipe(
      tap(
        response => {
          localStorage.setItem('authorization', response.headers.get('authorization') as string);
        }
      )
    );
  }

  public register(registerForm: RegisterForm): Observable<any> {
    return this.http.post(`${ResourcePath.USERS}/register`, registerForm);
  }

  public registerMainRegistration(): Observable<any> {
    const validateId = this.activatedRoute.snapshot.queryParamMap.get('validateId');
    return this.http.post(
      `${ResourcePath.USERS}/register/main_registration`,
      { validateId }
    );
  }
  /**========================*/

  isAuthenticate(): boolean {
    return !!this.token;
  }

  public isExpire() {
    if (this.decodeJWT() == null) {
      return;
    }
    const expire = this.decodeJWT().exp * 1000;
    const today = new Date().getTime();
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

  get userId(): string {
    return this.decodeJWT().sub as string;
  }

  get token(): string | null {
    return localStorage.getItem('authorization');
  }

  logout(): void {
    localStorage.removeItem('authorization');
    this.route.navigate(['/login']);
  }
}
