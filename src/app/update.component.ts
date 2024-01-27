import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Med} from './types';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api.service';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-update',
  template: `
     <app-header />
    <div class="form-box shadow-lg p-3 bg-white mt-1 rounded" style="height: 550px;">
    <h3 style="margin-left:70px">Update Medication</h3>
      <form
       
        [formGroup]="formData"
        (ngSubmit)="updateMedication()"
      >
        <div class="mb-1">
          <label for="Med_Name" class="form-label">Name</label>
          <input type="text" class="form-control" formControlName="name" />
          <div *ngIf="name.invalid && (name.dirty || name.touched)" class="error_message">
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
        <div class="mb-3">
          <label for="inputPassword1" class="form-label">Availability</label>
          <select class="form-select mb-3" [(ngModel)]='previousValue' aria-label="Default select example" formControlName="availability">
          <option value="In Stock">In Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>           
        </div>
        <input formControlName="avatar" type="file" class="mb-2" (change)="onFileSelect($event)" />   
        <button
          type="submit"
          class="btn btn-primary"
          [disabled]="formData.invalid"
        >
          Update Medication
        </button>
      </form>
    </div>
    <app-footer />
  `,
  styles: [],
})
export class UpdateComponent {
  #apiService = inject(ApiService);
  #router = inject(Router);
  #routes = inject(ActivatedRoute);
  #toaster = inject(ToasterService);
  previousValue: string =""
  file!: File;
  id: string = '';
  formData = inject(FormBuilder).nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    generic_name: ['', [Validators.required, Validators.minLength(3)]],
    availability: ['', [Validators.required, Validators.minLength(3)]],
    medication_class: ['', [Validators.required, Validators.minLength(3)]],
    avatar: ['', Validators.required]
  });
  constructor() {
    this.id = this.#routes.snapshot.paramMap.get('id') as string;
    this.#apiService.getMedication(this.id).subscribe(
      (res) => {
        this.#toaster.success('Medication data fetch successfully', 'Success');
        this.formData.patchValue({
          name: res.data.name,
          generic_name: res.data.generic_name,
          medication_class: res.data.medication_class,
          availability: res.data.availability,
        });
      },
      (error) => {
        this.#toaster.error(
          'Unable to fetch medication data',
          'Something went wrong'
        );
        this.#router.navigate(['home']);
      }
    );
  }
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
  updateMedication() {
    this.#apiService
      .updateMedicine(this.id, {...this.formData.value, file:this.file} as Med)
      .subscribe(
        (res) => {
          this.#toaster.success(
            'Medication data update successfully',
            'Success'
          );
          this.#router.navigate(['medications', this.id]);
        },
        (error) => {
          this.#toaster.error(
            'Unable to update medication data',
            'Something went wrong'
          );
        }
      );
  }
}
