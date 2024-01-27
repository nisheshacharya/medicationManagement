import { Component, inject } from '@angular/core';
import { ApiService } from './api.service';
import { Medication_List } from './types';
import { Router } from '@angular/router';
@Component({
  selector: 'app-medication-list',
  template: `
  <app-header />
    <div class="row m-2">
      <div
        class="card text-dark bg-info m-2 align-items-center justify-content-center shadow-lg p-3 bg-body rounded"
        style="max-width: 18rem;"
        *ngFor="let medication of medications"
      >
        <div (click)="viewDetail(medication)">
          <div class="card-body">
            <img src="./assets/image.jpeg" style="height: 200px; width:250px" />
            <h3 style="text-align: center;">{{ medication.name | uppercase }}</h3>
          </div>
        </div>
      </div>
    </div>
    <app-footer />
  `,
  styles: [
  ]
})
export class MedicationListComponent {
  #apiService = inject(ApiService);
  medications: Medication_List[] = [];
  #router = inject(Router);
  constructor() {
    this.#apiService.getMedications(JSON.parse(localStorage.getItem("char") as string)).subscribe((response) => {
      this.medications = response;
    });
  }
  viewDetail(med: any) {
    this.#router.navigate(['medications', med._id]);
  }
}
