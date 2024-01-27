import { HttpClient} from '@angular/common/http';
import { Injectable, inject ,signal} from '@angular/core';
import { Med, Medication_List, Post_Review, Signup_User } from './types';
import {map} from 'rxjs/operators';
const BASE_URL = "http://localhost:3000"
@Injectable({
  providedIn: 'root'
})
export class ApiService {
 #http = inject(HttpClient);
 medicationLetter = signal({letter:""})
  constructor() {
   }
  postMedication(med: Med){
return this.#http.post(`${BASE_URL}/medications`, med)
  }
  getMedications(char: string){
    return this.#http.get<Medication_List[]>(`${BASE_URL}/medications?first_letter=${char}`).pipe(map((res:any)=>{
      return res.data
    }))
  }
  updateMedicine(medication_id:string, medication: Med){
    return this.#http.put(`${BASE_URL}/medications/${medication_id}`, medication)
  }
  getMedication(medication_id: string){
    return this.#http.get<any>(`${BASE_URL}/medications/${medication_id}`)
  }
  getWithoutReview(id:string){
    return this.#http.get(`${BASE_URL}/medications/${id}`)
  }
  deleteMedication(id: string){
    return this.#http.delete(`${BASE_URL}/medications/${id}`)
  }
  addReview(id: string, review: Post_Review){
    return this.#http.post(`${BASE_URL}/medications/${id}/reviews`, review)
  }
  geReviews(id: string){
    return this.#http.get(`${BASE_URL}/medications/${id}/reviews`)
  }
  updateReview(id: string, review_id: string, review:Post_Review){
    return this.#http.put(`${BASE_URL}/medications/${id}/reviews/${review_id}`, review)
  }
  getReviewById(id: string, review_id: string){
    return this.#http.get(`${BASE_URL}/medications/${id}/reviews/${review_id}`)
  }
  deleteReview(id: string, review_id: string){
    return this.#http.delete(`${BASE_URL}/medications/${id}/reviews/${review_id}`)
  }
  getImage(id: string){
    return this.#http.get(`${BASE_URL}/medications/images/${id}`)
  }
}
