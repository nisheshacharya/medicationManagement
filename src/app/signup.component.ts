import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Signup_User } from './types';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-signup',
  template: `
    <app-header />
    <div class="form-box shadow-lg p-3 bg-white mt-5 rounded">
      <form
        style="padding: 30px;"
        [formGroup]="formData"
        (ngSubmit)="register()"
      >
        <div class="mb-3">
          <label for="InputName" class="form-label">Full Name</label>
          <input type="text" class="form-control" formControlName="fullname" />
          <div
            *ngIf="fullname.invalid && (fullname.dirty || fullname.touched)"
            class="error_message"
          >
            <div *ngIf="fullname.errors?.['required']">Full name required</div>
            <div *ngIf="fullname.errors?.['minlength']">
              Full name is less than 3 chars
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Email address</label
          >
          <input type="email" class="form-control" formControlName="email" />
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
          <label for="inputPassword1" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            formControlName="password"
          />
          <div
            *ngIf="password.invalid && (password.dirty || password.touched)"
            class="error_message"
          >
            <div *ngIf="password.errors?.['required']">
              Password is required
            </div>
            <div *ngIf="password.errors?.['minlength']">
              Password is less than 3 chars
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          [disabled]="formData.invalid"
        >
          Register</button
        > <a [routerLink]="['/login']">Already have account ?</a>
      </form>
    </div>
    <app-footer> </app-footer>
  `,
  styles: [],
})
export class SignupComponent {
  #authService = inject(AuthService);
  #router = inject(Router);
  #toaster = inject(ToasterService)
  formData = inject(FormBuilder).nonNullable.group({
    fullname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });
  get fullname() {
    return this.formData.get('fullname') as FormControl;
  }
  get email() {
    return this.formData.get('email') as FormControl;
  }
  get password() {
    return this.formData.get('password') as FormControl;
  }
  register() {
    this.#authService
      .signup(this.formData.value as Signup_User)
      .subscribe((res) => {
        this.#toaster.success("user create successfully", "Success")
        this.#router.navigate(['login']);
      },error =>{
        this.#toaster.error("Unable to Create user", "Something went wrong")
      });
  }
}
