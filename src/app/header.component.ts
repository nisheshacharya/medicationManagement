import { Component, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  template: `
       <nav class="navbar navbar-expand-lg  header_bar sticky-top shadow-sm">
      <div class="header_title">
        <span routerLink="">
          <img class="header_image" src="./assets/tree.png" />
          <h2 style="display: inline-block;">  MAHARISHI PHARMACEUTICALS</h2>
          <!-- <span *ngIf="isJwtPresent">Welcome {{name}}</span> -->
        </span>
      </div>
      <div class="container-fluid">
        <div class="header_buttons">
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item ">
                <a
                  [routerLink]="['/login']"
                  class="navbar-brand signin-button"
                  *ngIf="!isJwtPresent"
                  >Sign in</a
                >
              </li>
              <span *ngIf="isJwtPresent" style="color: aliceblue;">WELCOME {{name |uppercase}}</span>
              <li >
                <a
                  [routerLink]="['/signup']"
                  class="navbar-brand header_buttons register-button"
                  *ngIf="!isJwtPresent"
                  >Register</a
                >
              </li>
              <li class="nav-item add-med-container">
                <a
                  [routerLink]="['/add-medications']"
                  class="navbar-brand add-medication-text add-medication"
                  *ngIf="isJwtPresent"
                  >Add Medication</a
                >
              </li>
              <li >
               
              </li>
              <li class="nav-item" *ngIf="isJwtPresent">
                <div class="navbar-brand logout-button" (click)="logOut()">
                  Log out
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [],
})
export class HeaderComponent {
  #authService = inject(AuthService);
  #router = inject(Router);
  isJwtPresent: boolean = false;
  name: string ='';
  constructor() {
    const state = localStorage.getItem('state');
    if (state) {
      JSON.parse(state).jwt ? (this.isJwtPresent = !this.isJwtPresent) : false;
      this.name = JSON.parse(state).fullname 
    }
  }
  logOut() {
    localStorage.clear();
    this.#authService.user_signal({
      _id: '',
      name: '',
      email: '',
      jwt: '',
      iat: 0,
    });
    this.#router.navigate(['home']);
  }
}
