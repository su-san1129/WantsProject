import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { AuthenticateService } from '../service/authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm } from '../form/login-form';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private authService: AuthenticateService,
    private snackBar: MatSnackBar,
    private router: Router
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
      (res) => {
        if (sessionStorage.getItem('path')) {
          const next = decodeURIComponent(sessionStorage.getItem('path'));
          this.router.navigateByUrl(next);
        } else {
          this.router.navigate(['/wish']);
        }
      },
      () => this.snackBar.open('ログインに失敗しました', '閉じる', { duration: 3000 })
    );
  }

  public test() {
    this.authService.test();
  }

  get mailAddress() {
    return this.loginForm.get('mailAddress');
  }

  get password() {
    return this.loginForm.get('password');
  }


}
