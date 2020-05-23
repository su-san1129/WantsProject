import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from './service/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {

  constructor(private authService: AuthenticateService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticate() && this.authService.isExpire()) {
      sessionStorage.removeItem('path');
      return true;
    } else if (!this.authService.isExpire() && localStorage.getItem('authorization') !== null) {
      alert('ログインの有効期限が過ぎました。再度ログインしてください');
      localStorage.removeItem('authorization');
    }
    this.router.navigate(['/login']);
    return false;
  }
}
