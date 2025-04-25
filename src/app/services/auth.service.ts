import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { quizData, registerPostData, Users } from '../interfaces/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl='http://localhost:3000'
  // private quizUrl='http://localhost:3000/quizzes'
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
  createQuiz(quizData:quizData){
    return this.http.post(`${this.baseUrl}/quizzes`,quizData)
  }

  getQuizDetails():Observable<quizData[]>{
    return this.http.get<quizData[]>(`${this.baseUrl}/quizzes`)
  }

  getQuizById(id:string):Observable<quizData>{
    return this.http.get<quizData>(`${this.baseUrl}/quizzes/${id}`)
  }
  updateQuiz(data:quizData):Observable<quizData>{
    return this.http.put<quizData>(`${this.baseUrl}/quizzes/${data.id}`,data)

  }

  
}
