import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api.service';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-review',
  template: `
    <div
      class="form-box shadow-lg p-3 bg-body rounded"
    >
      <h2 style="margin-left: 50px;">Add Review</h2>
      <form [formGroup]="formData" (ngSubmit)="submitReview()">
      <div class="row" style="margin-left: 40px;">
          <div class="col-sm-12">
              <ul class="list-inline rating-list" 
                  *ngFor="let star of stars" style="display: inline-block" >
                    <li (click)="countStar(star)"
                        [ngClass]="{'selected': (star <= selectedValue)}">
                      <i class="fa fa-star"></i>
                    </li> 
              </ul>
          </div>
        </div>
        <div>
          <label for="exampleInputEmail1" class="form-label">Review</label>
          <input type="text" class="form-control" formControlName="review" />
          <div
            *ngIf="review.invalid && (review.dirty || review.touched)"
            class="error_message"
          >
            <div *ngIf="review.errors?.['required']">Review is required</div>
            <div *ngIf="review.errors?.['minlength']">
              Review is less than 3 chars
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary mt-3"
          [disabled]="formData.invalid"
        >
          Submit
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class ReviewComponent {
  #apiService = inject(ApiService);
  #routes = inject(ActivatedRoute);
  #router = inject(Router);
  #toaster = inject(ToasterService);
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue!: any;
  id: string = '';
  formData = inject(FormBuilder).nonNullable.group({
    review: ['', [Validators.required, Validators.minLength(2)]],
  });
  constructor() {
    this.id = this.#routes.snapshot.paramMap.get('id') as string;
  }
  get review() {
    return this.formData.get('review') as FormControl;
  }

  submitReview() {
    let data = { "review": this.formData.get("review")?.value as string, "rating": this.selectedValue }
    this.#apiService
      .addReview(this.id, data)
      .subscribe(
        (res) => {
          this.#toaster.success('Review add succcessfully', 'Success');
          this.#router.navigate(['medications', this.id]);
        },
        (error) => {
          this.#toaster.error('Unable to add review', 'Something went wrong');
        }
      );
  }
  countStar(star: any) {
    this.selectedValue = star;
  }
}
