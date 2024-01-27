import { Component, inject } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Post_User } from './types';
import { ToasterService } from './toaster.service';
@Component({
  selector: 'app-login',
  template: `
    <app-header />
    <div class="form-box shadow-lg p-3 bg-white mt-5 rounded">
      <form style="padding: 30px;" [formGroup]="formData" (ngSubmit)="login()">
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            formControlName="email"
          />
          <div
            *ngIf="email.invalid && (email.dirty || email.touched)"
            class="error_message"
          >
            <div *ngIf="email.errors?.['required']">Email is required</div>
            <div *ngIf="email.errors?.['minlength']">
              Email is less than 3 chars
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            formControlName="password"
          />
        </div>
        <div
          *ngIf="password.invalid && (password.dirty || password.touched)"
          class="error_message"
        >
          <div *ngIf="password.errors?.['required']">Password is required</div>
          <div *ngIf="password.errors?.['minlength']">
            Password is less than 3 chars
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          [disabled]="formData.invalid"
        >
          Submit
        </button>
        <a [routerLink]="['/signup']" class="navbar-brand">Create Account</a>
      </form>
    </div>
    <app-footer />
  `,
  styles: [],
})
export class LoginComponent {
  #authService = inject(AuthService);
  #toaster = inject(ToasterService);
  #router = inject(Router);
  formData = inject(FormBuilder).nonNullable.group({
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });
  constructor() {}
  get email() {
    return this.formData.get('email') as FormControl;
  }
  get password() {
    return this.formData.get('password') as FormControl;
  }
  login() {
    this.#authService.login(this.formData.value as Post_User).subscribe(
      (res) => {
        const jwt = jwtDecode(res.data);
        this.#authService.user_signal.set({ ...jwt, jwt: res.data });
        localStorage.setItem(
          'state',
          JSON.stringify(this.#authService.user_signal())
        );
        this.#router.navigate(['']);
        this.#toaster.success('Log in Successful', 'Success');
      },
      (error) => {
        this.#toaster.error('Invaild user or Password', 'Incorrect');
      }
    );
  }
}
