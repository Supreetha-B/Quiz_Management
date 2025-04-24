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

@Component({
  selector: 'app-dashboard',
  imports:[CardModule,ButtonModule,InputTextModule,TableModule,ChartModule,FormsModule],
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
    this.authService.getQuizDetails().subscribe(data=>{
      this.quizList=data
    })
  }
  
  stats = {
    total: 200,
    finished: 100,
    running: 25,
    completionRate: 70
  };

  exams = [
    { title: 'Angular Basics', startDate: '2024-04-10', endDate: '2024-04-12', duration: '60 mins' },
    { title: 'Node.js Intro', startDate: '2024-05-01', endDate: '2024-05-02', duration: '45 mins' }
  ];

  
  createQuiz() {
    this.router.navigate(['/quiz']);
  }
  

  viewResults(exam: any) {
    this.router.navigate(['/results', exam.title]);
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