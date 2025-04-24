import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { registerPostData, Users } from '../interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl='http://localhost:3000'
  constructor(private http:HttpClient) { }
  registerUser(postData:registerPostData)
  {
    return this.http.post(`${this.baseUrl}/users`,postData)
  }
  getUserDetails(mail:string,pwd:string)
  {
    return this.http.get<any[]>
    (`${this.baseUrl}/users?mail=${mail}&pwd=${pwd}`);
  }
  createQuiz(quizData:any):Observable<any>{
    return this.http.post(`${this.baseUrl}/quizzes`,quizData)
  }
}
