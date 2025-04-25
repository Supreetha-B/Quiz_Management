import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-quiz-attempt',
  imports: [FormsModule, CommonModule],
  templateUrl: './quiz-attempt.component.html',
  styleUrl: './quiz-attempt.component.css'
})
export class QuizAttemptComponent implements OnInit {
  quiz: any;
  answers: string[] = [];
  submitted = false;
  selectedAnswers:{[questionIndex:number]:string}={}
  constructor(private route: ActivatedRoute) { }
  private router = inject(Router)
  private authService = inject(AuthService)
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.authService.getQuizById(id!).subscribe((quiz) => {
      this.quiz = quiz;
      this.answers = new Array(quiz.questions.length).fill('');
    })
  }

  selectAnswer(questionIndex:number,options:string):void{
    this.selectedAnswers[questionIndex]=options
  }
  submitQuiz() {
    if (this.answers.includes('')) {
      alert('Please answer all questions');
      return;
    }

    this.quiz.answers = this.answers;
    this.quiz.attendedTime = new Date().toLocaleString();
    this.quiz.submitted = true;
    this.quiz.selectedAnswers=this.selectedAnswers;

    this.authService.updateQuiz(this.quiz).subscribe(() => {
      alert('Quiz Submitted Successfully');
      this.router.navigate(['/home'])
      // window.close();
    })
  }


}
