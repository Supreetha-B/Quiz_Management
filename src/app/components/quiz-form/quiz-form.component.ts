import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quiz-form',
  imports: [CommonModule],
  templateUrl: './quiz-form.component.html',
  styleUrl: './quiz-form.component.css'
})
export class QuizFormComponent{


  
  private authService = inject(AuthService)
  private router = inject(Router)
  private messageService = inject(MessageService)

  step = 1;
  // constructor(private router:Router,private authService:AuthService){}

  quizForm: any;
  

  title= new FormControl('', [Validators.required]);
  sDate= new FormControl('', [Validators.required]);
  eDate= new FormControl('', [Validators.required]);
  duration=new FormControl('', [Validators.required]);
  timer= new FormControl('', [Validators.required]);
  qns_count= new FormControl('', [Validators.required,Validators.min(1)]);
  questions:{question:FormControl;answer:FormControl}[]=[];

  // ngOnInit(): void {
  //   this.quizForm = new FormGroup({
  //     title: new FormControl('', [Validators.required]),
  //     sDate: new FormControl('', [Validators.required]),
  //     eDate: new FormControl('', [Validators.required]),
  //     duration: new FormControl('', [Validators.required]),
  //     timer: new FormControl('', [Validators.required]),
  //     qns_count: new FormControl('', [Validators.required]),
  //     questions:{question:FormControl;answer:FormControl}[]=[];

  //   })
  // }
  nextStep() {
    if (this.qns_count.valid) {
      const count=Number(this.qns_count.value);
      this.questions=Array.from({length:count},()=>({
        question:new FormControl('',Validators.required),
        answer: new FormControl('',Validators.required)
      }))
      this.step=2;
    }
    else 
    {
      // const postData = { ...this.quizForm.value };
      // this.authService.createQuiz(postData).subscribe(
      //   {
      //     next: (response) => {

      //       this.messageService.add({
      //         severity: 'success',
      //         summary: 'Success',
      //         detail: 'Quiz Created Successfully'
      //       });
      //       this.router.navigate(['createQuiz'])
      //       console.log(response);
      //     },
      //     error: (err) => {
      //       this.messageService.add({
      //         severity: 'error',
      //         summary: 'Error',
      //         detail: 'Something went wrong'
      //       });
      //       console.log(err);
      //     },
      //   }
      // )
    }
  }
  submitQuiz() 
  {
    
  }
}
