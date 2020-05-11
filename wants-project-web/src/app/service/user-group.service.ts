import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserGroup } from '../model/user-group';
import { ResourcePath } from '../resource-path';
import { UserGroupRequest } from '../model/user-group-request';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(private http: HttpClient) { }

  getGroupById(id: string): Observable<UserGroup> {
    return this.http.get<UserGroup>(`${ResourcePath.USER_GROUPS}?id=${id}`);
  }

  getGroupByuserId(id: string): Observable<UserGroup[]> {
    return this.http.get<UserGroup[]>(`${ResourcePath.USER_GROUPS}/${id}`);
  }

  saveUserGroup(userGroupRequest: UserGroupRequest): Observable<any> {
    return this.http.post<UserGroupRequest>(ResourcePath.USER_GROUPS, userGroupRequest);
  }

}
