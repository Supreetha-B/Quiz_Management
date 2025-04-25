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
  selectedAnswers: { [questionIndex: number]: string } = {};
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.currentUser = this.authService.getCurrentUser();

    if (id) {
      this.authService.getQuizById(id).subscribe((quiz) => {
        this.quiz = quiz;
        this.answers = new Array(quiz.questions.length).fill('');
      });
    }
  }

  selectAnswer(questionIndex: number, option: string): void {
    this.selectedAnswers[questionIndex] = option;
    this.answers[questionIndex] = option;
  }

  submitQuiz(): void {
    if (this.answers.includes("")) {
      alert('Please answer all questions');
      return;
    }

    this.authService.getUserQuizStatus().subscribe((statuses: any[]) => {
      const existingStatus = statuses.find(
        s => s.userId === this.currentUser.id && s.quizId === this.quiz.id
      );

      const statusData = {
        id: existingStatus?.id,
        userId: this.currentUser.id,
        quizId: this.quiz.id,
        submitted: true,
        selectedAnswers: this.selectedAnswers,
        attendedTime: new Date().toLocaleString()
      };

      const request$ = existingStatus
        ? this.authService.updateUserQuizStatus(statusData)
        : this.authService.createUserQuizStatus(statusData);

      request$.subscribe(() => {
        alert('Quiz Submitted Successfully');
        this.router.navigate(['/home']);
      });
    });
  }
}