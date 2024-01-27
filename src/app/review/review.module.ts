import { NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from '../review.component';
import { ReviewListComponent } from '../review-list.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule} from '@angular/forms'
import { UpdateReviewComponent } from '../update-review.component';
import { StarsDirective } from '../stars.directive';
import { AuthService } from '../auth.service';

@NgModule({
  declarations: [
    ReviewComponent, 
    ReviewListComponent,
    StarsDirective,
  ],
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    RouterModule.forChild([
      {
       path:"",
       component:ReviewComponent,
       title:"Add Medication Review"
      },
      {path: "reviews/:id",
      component: ReviewComponent,
      canActivate :[()=> inject(AuthService).isLogin()],
      title:"Add Medication Review"
    }, 
    {
      path: "update/:review_id",
      component: UpdateReviewComponent,
      canActivate :[()=> inject(AuthService).isLogin()],
     title:"Edit Medications Review"
    },
     {
      path: "reviews",
      component: ReviewListComponent,
      title:"Medications review"
    }
    ])
  ]
})
export class ReviewModule {

}
