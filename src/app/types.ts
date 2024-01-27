
export const BASE_URL = "http://localhost:3000";
export type User = { _id: string, fullname: string, email: string, password: string }
export type Image = { filename: string, originalname: string }
export type  Review = { review: string, rating: number, by: { user_id: string, fullname: string }, date: number }
export type Owner = { user_id: string, fullname: string, email: string }
export type  Medication = {
    name: string,
    first_letter: string,
    generic_name: string,
    medication_class: string,
    availability: string,
    image: Image,
    added_by: Owner,
    reviews: Review[]
}
export type Medication_List = {id:string, name:string};
export type Post_User = { "email": string, "password": string }
export type User_Response = { "success": boolean, "data": string } 
export type Signup_User = { "fullname":string, "email": string, "password": string }
export type Med = { "name": string, "generic_name": string, "medication_class": string, "availability": string}
export type multipart = "medication_image"
export type Medication_Response = { "success": boolean, "data": Medication }
export type Post_Review = { "review": string, "rating": string }
export type Review_Response = { "success": boolean, "data": string } 
export type Reviews_Responses = { "success": boolean, "data": Review[] } 
export type Jwt = {
    "_id": string,
    "fullname": string,
    "email": string ,
    "iat": number
  }