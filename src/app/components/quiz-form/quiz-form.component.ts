import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-form',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.css'
})

export class QuizFormComponent {
  title:string='';
  startDate:string='';
  endDate:string='';

  numberOfQuestions: number = 0;

  constructor(private router: Router) {}

  submit() {
    if (!this.title || !this.startDate || !this.endDate || this.numberOfQuestions <1) {
      alert('Provide all information');
      return;
    }
    this.router.navigate(['/create-quiz'], {
      queryParams: { 
        title:this.title,
        startDate:this.startDate,
        endDate:this.endDate,
        count: this.numberOfQuestions,
       }
    });
  }
  
}
