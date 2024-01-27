import { Component, inject } from '@angular/core';
import { ApiService } from './api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from './toaster.service';

@Component({
  selector: 'app-medication',
  template: `
    <app-header />
    <div class="row m-3">
      <div class="col-md-3 shadow-lg p-3 bg-body rounded" style="margin-right: 1%; margin-left: 20%; height:700px">
        <div class="coursecard-single">
          <div class="align-items-center justify-content-center justify-content-between">
            <img
              src="assets/image.jpeg"
              style="height: 200px; width:250px"
              alt=""
              class="img-fluid"
            />
          </div>
          <div class="content-main-top">
            <div class="content-top mb-4 mt-3">
              <ul
                class="list-unstyled d-flex align-items-center justify-content-between"
              >
                <li>{{ medications.availability | uppercase }} </li>
              </ul>
            </div>
            <h4><a>{{ medications.name | uppercase  }}</a></h4>
            <p><b>Generic Name: </b>{{ medications.generic_name }}</p>
            <p><b>Medication Class: </b>{{ medications.medication_class }}</p>
            <p><b>Date Create: </b>{{ medications.createdAt | date }}</p>
            <p><b>Created By: </b> {{ medications.added_by?.fullname | uppercase }}</p>
            <p><b>Owner Email : </b> {{ medications.added_by?.email }}</p>
             <button type="button" class="btn btn-primary" style="margin-right: 5%;" (click)="updateMedication()" *ngIf="isloggedIn" [disabled]="isSameUser"> Edit </button>
             <button type="button" class="btn btn-danger" (click)="deleteMedication()" *ngIf="isloggedIn" [disabled]="isSameUser">Delete</button>
          </div>
        </div>
      </div>
      <div class="col-md-3 shadow-lg p-3 bg-body rounded">
        <div class="coursecard-single">
        <div class="card-header"><b>REVIEWS</b>
        <button
          [routerLink]="['/medications', medications._id, 'reviews']"
          class="btn btn-primary"
          type="button"
          *ngIf="isloggedIn"
          style="margin-left: 65%;">Add Review</button>
        </div>
        <div class="card-body">
          <div *ngFor="let rev of reviews">
            <div style="border: solid gray 1px; padding: 5px; margin:3px" class="shadow-lg p-3 bg-body rounded">
              <div class="row" style="margin-left: 40px;">
                <div class="col-sm-12">
                  <h3>Rating </h3>
                    <ul class="list-inline rating-list" 
                        *ngFor="let star of stars" style="display: inline-block" >
                          <li [ngClass]="{'selected': (star <= rev.rating)}" style="pointer-events: none;">
                            <i class="fa fa-star"></i>
                          </li> 
                    </ul>
                </div>
              </div>
              <h5>Review: {{ rev.review }}</h5>
              <h4>Rating by: {{ rev.fullname }}</h4>
              <button type="button" class="btn btn-primary" style="margin-right: 5%;" (click)="editReview(rev._id)"  *ngIf="isloggedIn" [disabled]="!rev.isSameUser"> Edit </button>
             <button type="button" class="btn btn-danger" (click)="deleteReview(rev._id)" *ngIf="isloggedIn" [disabled]="!rev.isSameUser">Delete</button>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    <app-footer />
  `,
  styles: [],
})
export class MedicationComponent {
  #apiService = inject(ApiService);
  #toaster = inject(ToasterService);
  #routes = inject(ActivatedRoute);
  #router = inject(Router);
  stars: number[] = [1, 2, 3, 4, 5];
  medications: any;
  reviews:{
    _id:string,
    isSameUser:boolean,
    rating:number,
    review:string,
    fullname:string,
  }[]=[]
  isloggedIn: boolean = false;
  isSameUser: boolean =false
  reviewList: any = [];
  user: string = "";
  userId: string =''
  constructor() {
    const state = localStorage.getItem('state');
    if (state){
      JSON.parse(state).jwt
        ? (this.isloggedIn = !this.isloggedIn)
        : this.isloggedIn;
      this.user = JSON.parse(state).email
      this.userId = JSON.parse(state)._id
    }
    let id = this.#routes.snapshot.paramMap.get('id');
    this.#apiService.getMedication(id as string).subscribe((res) => {
      console.log(res)
      res.data.reviews.forEach((element: any) => {
      this.reviews.push({
        _id: element._id,
        isSameUser:element.by.user_id == this.userId,
        rating:element.rating,
        review:element.review,
        fullname:element.by.fullname,
      })
      });
       this.#toaster.success("Medication details fetch successfully", "Success")
      this.medications = res.data;
      (this.user == res.data.added_by.email)  ? this.isSameUser = false : this.isSameUser=true
    },error=>{
      this.#toaster.error("Unable to fetch medication details", "Something went wrong")
      this.#router.navigate(["home"])
    });
  }
  updateMedication() {
    this.#router.navigate(['update-medication', this.medications._id]);
  }
  deleteMedication() {
    this.#apiService
      .deleteMedication(this.medications._id)
      .subscribe((res) =>{
        this.#toaster.success("Medication delete successfully", "Success")
        this.#router.navigate(['home'])
      }, error=>{
        this.#toaster.error("Unable to delete medication", "Something went wrong")
        this.#router.navigate(['medications', this.medications._id]);
      });
  }
  editReview(id: string) {
    this.#router.navigate([
      'medications',
      this.medications._id,
      'reviews',
      'update',
      id,
    ]);
  }
  deleteReview(id: string) {
     const arr =  this.reviews.filter((review: any) =>review._id != id)
     this.reviews = arr;
    this.#apiService.deleteReview(this.medications._id, id).subscribe((res) => {
      this.#toaster.success("Review delete Successfully", "Success")
      this.#router.navigate(['medications', this.medications._id]);
    },error=>{
      this.#toaster.error("Unable to delete review", "Something went wrong")
      this.#router.navigate(['medications', this.medications._id]);
    });
  }
}
