import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from '../service/authenticate.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.scss']
})
export class AuthenticateComponent implements OnInit {

  constructor(private authService: AuthenticateService) { }

  message = '';

  ngOnInit(): void {
    this.authService.registerMainRegistration().subscribe(
      () => this.message = '登録に成功しました',
      () => this.message = '登録に失敗しました'
    );
  }

}
