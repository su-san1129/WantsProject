import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (localStorage.getItem('authorization')) {
      req = req.clone({
        setHeaders: {
          Authorization: localStorage.getItem('authorization')
        }
      });
    }
    return next.handle(req);
  }
 }
