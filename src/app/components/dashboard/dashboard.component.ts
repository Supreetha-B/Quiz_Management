import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ChartModule } from 'primeng/chart';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { AuthService } from '../../services/auth.service';
import { endWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { userQuizResults } from '../../interfaces/auth';

@Component({
  selector: 'app-dashboard',
  imports:[CardModule,ButtonModule,InputTextModule,TableModule,CommonModule,ChartModule,FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // constructor(private router: Router) {}

  private router=inject(Router)
  private authService=inject(AuthService)

  userName = 'Admin'; // fetch from auth/user service
  totalQuestions = 0;
  plugins=[ChartDataLabels]; 
  pieOptions:any;
  pieChartData: any;
  quizList:any[]=[]
  quizzes:any[]=[];

  ngOnInit(){
    this.pieChartData={
      labels: ['Attempted', 'Awaiting', 'Not Attempted', 'In Progress'],
      datasets: [{
        data: [120, 50, 30, 25],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FF6384']
      }]
    }
    this.pieOptions={
      responsive: true,
      plugins:{
        legend:{
          postion:'right',
        },
        datalabels:{
          color:'black',
          formatter:(value:any)=>`${value}`,
        }
      }
    }
    this.loadQuiz()
  }


  loadQuiz(){
    this.authService.getQuizDetails().subscribe({
      // this.quizList=data.map((quiz:any)=>({
      //   title:quiz.title,
      //   startDate:quiz.startDate,
      //   endDate:quiz.endDate,

      // }))
      next:(data)=>{
        console.log("Load quiz",data)
        this.quizzes=data;
      }
    })
  }
  
  stats = {
    total: 200,
    finished: 100,
    running: 25,
    completionRate: 70
  };

  // exams = [
  //   { title: 'Angular Basics', startDate: '2024-04-10', endDate: '2024-04-12', duration: '60 mins' },
  //   { title: 'Node.js Intro', startDate: '2024-05-01', endDate: '2024-05-02', duration: '45 mins' }
  // ];

  
  createQuiz() {
    this.router.navigate(['/quiz']);
  }
  

  viewResults(quizId: number): void {
    this.authService.getUserQuizResultsByQuiz(quizId).subscribe((results) => {
      if (!results || !Array.isArray(results)) {
        alert('No results found.');
        return;
      }

      const formattedResults = results.map(r =>
        `User ${r.userId}: ${r.correctAnswers}/${r.totalQuestions}`
      ).join('\n');

      alert(`Results for Quiz ID ${quizId}:\n\n${formattedResults}`);
      console.log(results);
    });
    
  }

  

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  viewUsers() {
    this.router.navigate(['/users']);
  }

  signOut() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}