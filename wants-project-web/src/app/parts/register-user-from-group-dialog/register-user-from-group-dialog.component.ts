import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticateService } from 'src/app/service/authenticate.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/model/user';
import { RegisterPreUserForm } from 'src/app/form/register-pre-user-form';
import { LoginForm } from 'src/app/form/login-form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-user-from-group-dialog',
  templateUrl: './register-user-from-group-dialog.component.html',
  styleUrls: ['./register-user-from-group-dialog.component.scss']
})
export class RegisterUserFromGroupDialogComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private authService: AuthenticateService,
    private snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<RegisterUserFromGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: User
  ) { }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      userId: new FormControl(this.data.userId),
      name: new FormControl(''),
      mailAddress: new FormControl(this.data.mailAddress, Validators.required),
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
    const registerForm = new RegisterPreUserForm(this.userId.value, this.name.value, this.mailAddress.value, this.password.value);
    this.authService.registerPreUser(registerForm).subscribe(
      () => {
        this.registerForm.reset();
        const loginForm = new LoginForm(this.mailAddress, this.password);
        this.authService.login(loginForm).subscribe(
          () => this.router.navigate(['/wish'])
        );
      },
      () => this.snackBar.open('新規登録に失敗しました', '閉じる', { duration: 2500 })
    );
    e.preventDefault();
  }

  public formValid(formControl: AbstractControl): boolean {
    return formControl.invalid && (formControl.dirty || formControl.touched);
  }

  get userId() { return this.registerForm.get('userId'); }

  get name() { return this.registerForm.get('name'); }

  get mailAddress() { return this.registerForm.get('mailAddress'); }

  get password() { return this.registerForm.get('password'); }

  get passwordConfirm() { return this.registerForm.get('passwordConfirm'); }

}
