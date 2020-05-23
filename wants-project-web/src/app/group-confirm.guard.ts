import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AuthenticateService } from './service/authenticate.service';
import { UserGroupService } from './service/user-group.service';

@Injectable({
  providedIn: 'root'
})
export class GroupConfirmGuard implements CanActivate {

  do: Subject<boolean> = new Subject();
  constructor(
    private authService: AuthenticateService,
    private router: Router,
    private userGroupService: UserGroupService
  ) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const userId = atob(next.params.userId);
    const groupId = next.params.id;
    this.userGroupService.getPreUser(userId).subscribe(
      preUser => {
        this.do.next(true);
      },
      error => {
        this.router.navigate(['/']);
        this.do.next(false);
      }
    );
    return this.do;
  }

}
