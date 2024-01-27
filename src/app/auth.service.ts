import { Injectable, inject,signal } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { BASE_URL, Post_User, Signup_User } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  #http = inject(HttpClient)
  user_signal :any= signal({_id:"", name:"" , email: "", jwt: "", iat:0})
  constructor() {
    const state = localStorage.getItem("state")
    if(state) {
      const data = JSON.parse(state)
      this.user_signal.set({...data, name:data.fullname})
    }
   }
  isLogin(){
    return this.user_signal().jwt? true: false;
  }
  login(user:Post_User){
    return this.#http.post<any>(`${BASE_URL}/users/signin`, user);
  }
  signup(user: Signup_User){
    return this.#http.post(`${BASE_URL}/users/signup`, user);
  }
 

}
