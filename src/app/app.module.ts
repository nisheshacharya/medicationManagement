import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login.component';
import { SignupComponent } from './signup.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {jwtTokenInterceptor} from "./jwt-token.interceptor";
import { MedicationComponent } from './medication.component';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddMedicationComponent } from './add-medication.component';
import { UpdateComponent } from './update.component';
import { UpdateReviewComponent } from './update-review.component';
import { HomeComponent } from './home.component';
import { MedicationListComponent } from './medication-list.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    MedicationComponent,
    HeaderComponent,
    FooterComponent,
    AddMedicationComponent,
    UpdateComponent,
    UpdateReviewComponent,
    HomeComponent,
    MedicationListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideHttpClient(withInterceptors([jwtTokenInterceptor]))],
  bootstrap: [AppComponent]
})
export class AppModule { }
