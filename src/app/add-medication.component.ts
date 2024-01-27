import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Med } from './types';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-add-medication',
  template: `
    <app-header />
    <div class="form-box shadow-lg bg-body rounded" style="height: 550px;">
      <h3 style="margin-left:100px">Add Medication</h3>
      <form
        style="padding: 10px;"
        [formGroup]="formData"
        (ngSubmit)="addMedication()"
      >
        <div class="mb-3">
          <label for="Med_Name" class="form-label">Name</label>
          <input type="text" class="form-control" formControlName="name" />
          <div
            *ngIf="name.invalid && (name.dirty || name.touched)"
            class="error_message"
          >
            <div *ngIf="name.errors?.['required']">Name required</div>
            <div *ngIf="name.errors?.['minlength']">
              Name is less than 3 chars
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label"
            >Generic Name</label
          >
          <input
            type="text"
            class="form-control"
            formControlName="generic_name"
          />
          <div
            *ngIf="
              generic_name.invalid &&
              (generic_name.dirty || generic_name.touched)
            "
            class="error_message"
          >
            <div *ngIf="generic_name.errors?.['required']">
              Generic name is required
            </div>
            <div *ngIf="generic_name.errors?.['minlength']">
              Generic name is less than 3 chars
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="inputPassword1" class="form-label"
            >Medication class</label
          >
          <input
            type="text"
            class="form-control"
            formControlName="medication_class"
          />
          <div
            *ngIf="
              medication_class.invalid &&
              (medication_class.dirty || medication_class.touched)
            "
            class="error_message"
          >
            <div *ngIf="medication_class.errors?.['required']">
              Medication Class is required
            </div>
            <div *ngIf="medication_class.errors?.['minlength']">
              Meciation Class is less than 3 chars
            </div>
          </div>
        </div>  
        <label for="exampleInputEmail1" class="form-label">Availability</label>    
        <select class="form-select mb-3" aria-label="Default select example" formControlName="availability">
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>   
        <input formControlName="avatar" type="file" (change)="onFileSelect($event)" />        
        <button
          type="submit"
          class="btn btn-primary mt-3"
          [disabled]="formData.invalid"
        >
          Add Medication
        </button>
      </form>
    </div>
    <app-footer />
  `,
  styles: [],
})
export class AddMedicationComponent {
  #apiService = inject(ApiService);
  #router = inject(Router);
  file!: File;
  #toaster = inject(ToasterService);
  formData = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    generic_name: ['', [Validators.required, Validators.minLength(3)]],
    availability: ['', [Validators.required, Validators.minLength(3)]],
    medication_class: ['', [Validators.required, Validators.minLength(3)]],
    avatar: ['', Validators.required]
  });

  get name() {
    return this.formData.get('name') as FormControl;
  }
  get availability() {
    return this.formData.get('availability') as FormControl;
  }
  get generic_name() {
    return this.formData.get('generic_name') as FormControl;
  }
  get medication_class() {
    return this.formData.get('medication_class') as FormControl;
  }
  onFileSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files!.length > 0) this.file = input.files![0];
    }
  addMedication() {
    this.#apiService.postMedication({...this.formData.value, file:this.file} as Med).subscribe(
      (res) => {
        this.#toaster.success('Medication add successfully', 'Success');
        this.#router.navigate(['']);
      },
      (errrr) => {
        this.#toaster.error('Unable to add medication', 'Something went wrong');
      }
    );
  }
}
