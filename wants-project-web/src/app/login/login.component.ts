import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { LoginForm } from 'src/model/LoginForm';
import { AuthenticateService } from '../authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthenticateService,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      mailAddress: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  public formValid(formControl: AbstractControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  public login(e: Event) {
    if (this.loginForm.invalid) {
      return;
    }
    e.preventDefault();

    const userLoginForm = new LoginForm(
      this.mailAddress.value,
      this.password.value
    );
    this.loginForm.reset();
    this.authService.login(userLoginForm).subscribe(
      () => {},
      () => this._snackBar.open('ログインに失敗しました', '閉じる', { duration: 3000 })
    );
  }

  get mailAddress() {
    return this.loginForm.get('mailAddress');
  }

  get password() {
    return this.loginForm.get('password');
  }


}
