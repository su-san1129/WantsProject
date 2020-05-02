import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthenticateService) { }

  isAuth: boolean;


  ngOnInit(): void {
    this.isAuth = this.authService.isAuthenticate();
    console.log(this.authService.isAuthenticate());
  }

  logout(): void {
    this.authService.logout();
    this.isAuth = false;
  }

  get isAuthe() {
    return this.authService.isAuthenticate();
  }

}
