import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticateService) { }

  isAuthenticate: boolean;

  headers = [
    { path: '', name: 'トップ'},
    { path: 'login', name: 'ログイン'},
    { path: 'signin', name: '新規登録'},
    { path: 'wish', name: '欲しいものリスト'},
    { path: 'user_group', name: 'ユーザーグループ'},
  ];

  ngOnInit(): void {
  }

  logout(): void {
    this.authService.logout();
  }

  isAuth(name: string): boolean {
    if (name === 'トップ') {
      return true;
    }
    if (name === 'ログイン' || name === '新規登録') {
      return !this.authService.isAuthenticate();
    }
    return this.authService.isAuthenticate();
  }
}
