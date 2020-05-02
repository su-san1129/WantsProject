import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResourcePath } from '../resource-path';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishService {
  private auth = '';
  private AUTH_HEADER: HttpHeaders;
  constructor(private http: HttpClient) {
    this.auth = localStorage.getItem('authorization');
    this.AUTH_HEADER = new HttpHeaders({ Authorization: this.auth });
  }

  public save(wishItemUrl): Observable<any> {
    const url = { url: wishItemUrl };
    return this.http.post(`${ResourcePath.URL}/wishes`, url, {headers: this.AUTH_HEADER});
  }

}
