import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { quizData } from '../../interfaces/auth';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-create-quiz',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrl: './create-quiz.component.css'
})
export class CreateQuizComponent implements OnInit{

constructor(private route: ActivatedRoute) {}

private messageService=inject(MessageService)
private router=inject(Router)
private authService=inject(AuthService)


questionCount: number = 0;
title:string='';
startDate:string='';
endDate:string='';
questions:any[]=[];


ngOnInit() {
  this.route.queryParams.subscribe(params => {
    this.questionCount = +params['count'] || 0;
    this.title=params['title'] || '';
    this.startDate=params['startDate'] || '';
    this.endDate=params['endDate'] || '';
    this.generateQuestions();
  });
}

generateQuestions() {
  this.questions = Array.from({ length: this.questionCount }, () => ({
    question: '',
    options:Array.from({length:4},()=>''),
    correctAnswer: ''
  }));
}

submitQuiz() {
  const user=this.authService.getCurrentUser();
  const postData={
    userId:user.id,
    title:this.title,
    startDate:this.startDate,
    endDate:this.endDate,
    questions:this.questions,
    submitted:false

  }
      this.authService.createQuiz(postData).subscribe(
        {
          next:(response)=>{
            
            this.messageService.add({
              severity:'success',
              summary:'Success',
              detail:'Registered Successfully'
            });
            this.router.navigate(['login'])
            console.log(response);
          },
          error:(err)=>{
            this.messageService.add({
              severity:'error',
              summary:'Error',
              detail:'Invalid Mail or Password'
            });
            console.log(err);
          },
        }
      )
  
  // Here you can send `this.questions` to your backend or JSON server
}
}