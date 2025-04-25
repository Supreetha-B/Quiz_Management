import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { QuizCardComponent } from "../quiz-card/quiz-card.component";

@Component({
  selector: 'app-home',
  imports: [ButtonModule, FormsModule, ReactiveFormsModule, CommonModule, QuizCardComponent],
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
    if(!user || !user.id)
    {
      this.router.navigate(['/login']);
    }
    this.firstName=user.firstName;
    this.fetchQuizzes();
  }
  fetchQuizzes() {
    const user = this.authService.getCurrentUser();
    if (!user) return;
  
    this.authService.getQuizDetails().subscribe((quizzes) => {
      this.authService.getUserQuizStatus().subscribe((statuses) => {
        const userStatuses = statuses.filter(status => status.userId === user.id);
  
        this.activeQuizzes = quizzes.filter(quiz => {
          return !userStatuses.find(status => status.quizId === quiz.id && status.submitted);
        });
  
        this.completedQuizzes = quizzes.filter(quiz => {
          return userStatuses.find(status => status.quizId === quiz.id && status.submitted);
        });
      });
    });
  }
  

  startQuiz()
  {
    this.router.navigate(['/quiz-card']);
  }
  viewReport(){
    this.router.navigate(['/report'])
  }
  goHome() {
    this.currentTab='active'
    this.router.navigate(['/home']);
  }

  viewUsers() {
    this.currentTab='completed'
  }

  signOut() {
    sessionStorage.clear(); 
    this.router.navigate(['/login']);
  }
}