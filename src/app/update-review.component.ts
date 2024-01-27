import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from './api.service';
import { ToasterService } from './toaster.service';
@Component({
  selector: 'app-update-review',
  template: `
    <div class="form-box shadow-lg p-3 bg-body rounded">
      <h2 style="margin-left: 50px;">Update Review</h2>
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
      <form
        style="padding: 30px;"
        [formGroup]="formData"
        (ngSubmit)="submitUpdateReview()"
      >
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Review</label>
          <input type="text" class="form-control" formControlName="review" />
          <div
            *ngIf="review.invalid && (review.dirty || review.touched)"
            class="error_message"
          >
            <div *ngIf="review.errors?.['required']">review is required</div>
            <div *ngIf="review.errors?.['minlength']">review is required</div>
          </div>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          [disabled]="formData.invalid"
        >
          Submit
        </button>
      </form>
    </div>
  `,
  styles: [],
})
export class UpdateReviewComponent {
  #apiService = inject(ApiService);
  #routes = inject(ActivatedRoute);
  #router = inject(Router);
  #toaster = inject(ToasterService);
  review_id: string = '';
  stars: number[] = [1, 2, 3, 4, 5];
  selectedValue!: any;
  id: string = '';
  formData = inject(FormBuilder).nonNullable.group({
    review: ['', [Validators.required, Validators.minLength(2)]],
  });
  constructor() {
    this.id = this.#routes.snapshot.paramMap.get('id') as string;
    this.review_id = this.#routes.snapshot.paramMap.get('review_id') as string;
    this.#apiService.getReviewById(this.id, this.review_id).subscribe(
      (res: any) => {
        this.#toaster.success(
          'Medication review fetch successgully',
          'Success'
        );
        this.formData.patchValue({
          review: res.data.review,
        });
        this.selectedValue = res.data.rating;
      },
      (error) => {
        this.#toaster.error(
          'Unable to fetch medication review',
          'Something went wrong'
        );
      }
    );
  }
  get review() {
    return this.formData.get('review') as FormControl;
  }
  submitUpdateReview() {
    let data = { "review": this.formData.get("review")?.value as string, "rating": this.selectedValue }
    this.#apiService
      .updateReview(this.id, this.review_id, data)
      .subscribe(
        (res) => {
          this.#toaster.success(
            'Medication review update successgully',
            'Success'
          );
          this.#router.navigate(['medications', this.id]);
        },
        (error) => {
          this.#toaster.error(
            'Unable to update medication review',
            'Something went wrong'
          );
        }
      );
  }
  countStar(star: any) {
    this.selectedValue = star;
  }
}
