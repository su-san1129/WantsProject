import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginForm } from '../model/form';
import { AuthService } from '../service/auth.service';
import { User } from '../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    this.errorMessage = '';
    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    this.authService.login({
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value
    })
      .subscribe(
        response => {
          const user = response.body as User;
          if (user.role === 'PRE_USER') {
            console.log('error');
            this.errorMessage = '本登録が行われていません。';
          } else {
            console.log('navigate');
            this.router.navigateByUrl('/');
          }

        },
        err => console.error(err)
      );
  }
}




