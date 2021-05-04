import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterForm } from '../model/form';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  registerForm!: FormGroup;
  isDuplicatedEmail: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: [null, [
        Validators.email, 
        Validators.required, 
        this.duplicatedEmailValidator
      ]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]],
    });
  }

  submitForm(): void {
    this.isDuplicatedEmail = false;
    for (const i in this.registerForm.controls) {
      this.registerForm.controls[i].markAsDirty();
      this.registerForm.controls[i].updateValueAndValidity();
    }

    this.authService.register({
      name: this.registerForm.get('name')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value
    }).subscribe(
      response => {},
      error => {
        this.isDuplicatedEmail = true;
        this.registerForm.controls['email'].updateValueAndValidity();
        this.isDuplicatedEmail = false;
      }
    );

  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.registerForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.registerForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  duplicatedEmailValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (this.isDuplicatedEmail) {
      return { duplicated: true, error: true };
    }
    return {};
  };
}
