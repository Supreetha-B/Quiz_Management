import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [ButtonModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  firstName:'' | undefined;
  activeQuizzes:any[]=[];
  completedQuizzes:any[]=[];
  currentTab:'active' |'completed'='active'
  sortOrder='asc' ;

  private router=inject(Router)
  private authService=inject(AuthService)

  ngOnInit(){
    const user=JSON.parse(localStorage.getItem('loggedInUser') || '{}')
    this.firstName=user.firstName;
    this.fetchQuizzes();
  }

  fetchQuizzes(){
    this.authService.getQuizDetails().subscribe((quizzes)=>{
      this.activeQuizzes=quizzes.filter((q:any)=>!q.submitted);
      this.completedQuizzes=quizzes.filter((q:any)=>q.submitted)
    })
  }

  sortQuizzes(order:'asc' | 'desc')
  {
    this.sortOrder=order;
    const sortFn=(a:any,b:any)=>a.title.localeCompare(b.title);
    this.activeQuizzes.sort(sortFn);
    this.completedQuizzes.sort(sortFn);
    if(order==='desc')
    {
      this.activeQuizzes.reverse();
      this.completedQuizzes.reverse();
    }
  }

  openQuiz(quiz:any)
  {
    this.router.navigate(['/quiz-card'],quiz.id)
  }
  
  goHome() {
    this.router.navigate(['/home']);
  }

  viewUsers() {
    this.router.navigate(['/users']);
  }

  signOut() {
    sessionStorage.clear(); 
    this.router.navigate(['/login']);
  }
}
