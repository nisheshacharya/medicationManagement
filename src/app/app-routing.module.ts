import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup.component';
import { LoginComponent } from './login.component';
import { MedicationComponent } from './medication.component';
import { UpdateComponent } from './update.component';
import { HomeComponent } from './home.component';
import { AddMedicationComponent } from './add-medication.component';
import { MedicationListComponent } from './medication-list.component';
import { AuthService } from './auth.service';

const routes: Routes = [
  
  {
    path:"",
    component: HomeComponent,
    pathMatch: 'full',
    title:"Medications"
  },
  {
    path: "home",
    component: HomeComponent,
    title:"Medications"
  },
  {
    path: "medications",
    component: MedicationListComponent,
    title:"Medications"
  },
  {
    path: "add-medications",
    component: AddMedicationComponent,
    canActivate :[()=> inject(AuthService).isLogin()],
    title:"Add Medication"
  }, 
  {
    path:"medications/:id",
    component: MedicationComponent,
    title:"Medication details"
  },
  {
    path: "signup",
    component: SignupComponent,
    title:"User Registration"
  },
  {
    path: "login",
    component: LoginComponent,
    title:"User Log in"
  },
  {
    path: "update-medication/:id",
    component: UpdateComponent,
    canActivate :[()=> inject(AuthService).isLogin()],
    title:"Update Medication"
  },
  {
    path:"medications/:id/reviews",
    loadChildren: ()=> import("./review/review.module").then(m => m.ReviewModule),
    title:"Medications details"
  },
  {
    path: "**",
    redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
