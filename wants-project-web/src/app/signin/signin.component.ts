import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { AuthenticateService } from '../service/authenticate.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterForm } from '../form/register-form';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private authService: AuthenticateService,
    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
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
    return this.passwordConfirm.hasError('noMatch') && this.passwordConfirm.value;
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
