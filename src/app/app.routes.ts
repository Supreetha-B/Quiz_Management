import { Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormComponent } from './components/form/form.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';
import { QuizCardComponent } from './components/quiz-card/quiz-card.component';
import { QuizAttemptComponent } from './components/quiz-attempt/quiz-attempt.component';
import { ReportComponent } from './components/report/report.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:FormComponent},
    {path:'home',component:HomeComponent,canActivate:[authGuard]},
    {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
    {path:'quiz',component:QuizFormComponent},
    {path:'create-quiz',component:CreateQuizComponent},
    {path:'quiz-card',component:QuizCardComponent},
    {path:'quiz-attempt/:id',component:QuizAttemptComponent},
    {path:'report/:id',component:ReportComponent}
    // {path:'**',component:ErrorPageComponent}
];
