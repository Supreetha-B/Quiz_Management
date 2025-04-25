import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { quizData, registerPostData, userQuizResults, userQuizStatus, Users } from '../interfaces/auth';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseUrl='http://localhost:3000'
  // private quizUrl='http://localhost:3000/quizzes'
  constructor(private http:HttpClient) { }

  getCurrentUser(){
    const userData=sessionStorage.getItem('loggedInUser')|| localStorage.getItem('loggedInUser')
    return userData?JSON.parse(userData):null
  }
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
  
  getUserQuizStatuses(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/userQuizStatus?userId=${userId}`)
  }
  getUserQuizStatus(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/userQuizStatus`);
  }
  
  updateUserQuizStatus(status: any): Observable<userQuizStatus> {
    return this.http.put<userQuizStatus>(`${this.baseUrl}/userQuizStatus/${status.id}`, status);
  }
  
  createUserQuizStatus(status: any): Observable<userQuizStatus> {
    return this.http.post<userQuizStatus>(`${this.baseUrl}/userQuizStatus`, status);
  }

  getUserQuizResultsByQuiz(quizId:number):Observable<userQuizResults[]>{
    return this.http.get<userQuizResults[]>(`${this.baseUrl}/userQuizResults?quizId=${quizId}`)
  }

}