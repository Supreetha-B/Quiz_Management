import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule, NgControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-card',
  imports: [FormsModule,CommonModule],
  templateUrl: './quiz-card.component.html',
  styleUrl: './quiz-card.component.css'
})
export class QuizCardComponent implements OnInit{

  @Input() quiz:any;
  @Input() isCompleted:boolean=false;
  private router=inject(Router)
  ngOnInit(){
    console.log('Quiz input',this.quiz)
  }
  startQuiz(){
    if(this.quiz && this.quiz.id){
    this.router.navigate(['/quiz-attempt',this.quiz.id])
    }
    else{
      console.error('Quiz or Quiz id is missing')
    }
  }

  viewReport(){
    this.router.navigate(['/report',this.quiz.id])
  }
}
