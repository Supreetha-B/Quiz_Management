import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { quizData } from '../../interfaces/auth';

@Component({
  selector: 'app-report',
  imports: [FormsModule,CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit{
  constructor(private route: ActivatedRoute) {}
  private router=inject(Router)
  private authService=inject(AuthService)
  quiz!:quizData;
  correctCount=0;
  

  ngOnInit(): void {
    const id=this.route.snapshot.paramMap.get('id');
    this.authService.getQuizById(id!).subscribe((quiz)=>{
      this.quiz=quiz;
      if(quiz.answers && quiz.questions && quiz.answers.length===quiz.questions.length){
      this.correctCount=quiz.questions.filter((q:any,i:number)=>
        q.correctAnswer===q.answers[i]
    ).length;
    }
    else{
      this.correctCount=0;
    }
    })
  }

}
