import { Component, inject } from '@angular/core';
import { ApiService } from './api.service';
import {  Router } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-home',
  template: `
    <app-header />
    <div>
      <form
        class="d-flex"
        class="m-2"
        [formGroup]="formData"
        (ngSubmit)="searchMedication()"
      >
        <div class="row">
          <div class="col-sm">
            <input
              class="form-control m-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              formControlName="searchInput"
              style="height: 50px;"
            />
            <div
              *ngIf="
                searchInput.invalid &&
                (searchInput.dirty || searchInput.touched)
              "
              class="error_message"
            >
              <div *ngIf="searchInput.errors?.['required']">
                1 letter is required
              </div>
              <div *ngIf="searchInput.errors?.['minlength']">
                Minimum letter should 1 char
              </div>
              <div *ngIf="searchInput.errors?.['maxlength']">
                Maximum letter should 1 char
              </div>
            </div>
          </div>
          <div class="col-sm">
            <button
              class="btn btn-outline-primary mt-3"
              type="submit"
              [disabled]="formData.invalid"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </div>

    <div class="container">
      <div *ngFor="let char of chars" style="margin: 5px;">
        <button
          type="button"
          class="btn btn-outline-secondary"
          (click)="getMedications(char)"
        >
          {{ char }}
        </button>
      </div>
    </div>
    <app-footer />
  `,
  styles: [],
})
export class HomeComponent {
  #apiService = inject(ApiService);
  #router = inject(Router);
  #toaster = inject(ToasterService)
  chars: string[] = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
  ];
  formData = inject(FormBuilder).nonNullable.group({
    searchInput: [
      '',
      [Validators.required, Validators.minLength(1), Validators.maxLength(1)],
    ],
  });

  get searchInput() {
    return this.formData.get('searchInput') as FormControl;
  }
  searchMedication() {
    this.#apiService.medicationLetter.set({
      letter: this.formData.value.searchInput as string,
    });
    localStorage.setItem(
      'char',
      JSON.stringify(this.formData.value.searchInput)
    );
    this.#apiService
      .getMedications(this.formData.value.searchInput as string)
      .subscribe((res) => {
        if(res.length<1){
        this.#toaster.error("Medication not found!", "Somthing went wrong")
        this.#router.navigate(['home']);
        }else{
          this.#toaster.success("Medication found sccessgully", "Success")
          this.#router.navigate(['medications']);
        }
      }, error =>{
        this.#toaster.error("Medication not found!", "Somthing went wrong")
        this.#router.navigate(['home']);
      });
  }
  getMedications(char: string) {
    this.#apiService.medicationLetter.set({ letter: char });
    localStorage.setItem('char', JSON.stringify(char));
    this.#apiService.getMedications(char).subscribe((res) => {
      if(res.length<1){
      this.#toaster.error("Medication not found!", "Somthing went wrong")
      this.#router.navigate(['home']);
      }else{
        this.#toaster.success("Medication found sccessgully", "Success")
        this.#router.navigate(['medications']);
      }
    },error=>{
      this.#toaster.error("Medication not found!", "Somthing went wrong")
      this.#router.navigate(['home']);
    });
  }
}
