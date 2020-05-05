import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ResourcePath } from '../resource-path';
import { Observable } from 'rxjs';
import { WishItem } from '../model/wish-item';

@Injectable({
  providedIn: 'root'
})
export class WishService {
  private auth = '';
  constructor(private http: HttpClient) {}

  public save(wishItemUrl): Observable<any> {
    const url = { url: wishItemUrl };
    return this.http.post(`${ResourcePath.URL}/wishes`, url);
  }

  public saveWishItem(wishItem: WishItem): Observable<any> {
    return this.http.post(`${ResourcePath.URL}/wishes/new`, wishItem);
  }

  public getWishItems(): Observable<WishItem[]> {
    return this.http.get<WishItem[]>(`${ResourcePath.URL}/wishes`);
  }

  public deleteWishItem(id: number): Observable<any> {
    return this.http.delete(`${ResourcePath.URL}/wishes?id=${id}`);
  }

}
