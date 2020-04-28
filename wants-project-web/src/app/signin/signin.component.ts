import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { RegisterForm } from 'src/model/registerForm';
import { AuthenticateService } from '../authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private authService: AuthenticateService,
    // tslint:disable-next-line: variable-name
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl(''),
      mailAddress: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      passwordConfirm: new FormControl('', Validators.required),
    });
  }

  checkPasswords() {
    if (this.registerForm.value.passwordConfirm !== this.registerForm.value.password) {
      this.registerForm.get('passwordConfirm').setErrors({ noMatch: true });
    } else {
      this.registerForm.get('passwordConfirm').setErrors(null);
    }
  }

  isMatchPassword(): boolean {
    return this.passwordConfirm.hasError('noMatch') && this.passwordConfirm.value.length;
  }

  register(e: Event) {
    const registerForm = new RegisterForm(this.name.value, this.mailAddress.value, this.password.value);
    this.registerForm.reset();
    this.authService.register(registerForm).subscribe(
      () => {},
      () => this._snackBar.open('新規登録に失敗しました', '閉じる', { duration: 2500 })
    );
    e.preventDefault();
  }

  public formValid(formControl: AbstractControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  get name() { return this.registerForm.get('name'); }

  get mailAddress() { return this.registerForm.get('mailAddress'); }

  get password() { return this.registerForm.get('password'); }

  get passwordConfirm() { return this.registerForm.get('passwordConfirm'); }

}
