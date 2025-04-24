import { Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormComponent } from './components/form/form.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { CreateQuizComponent } from './components/create-quiz/create-quiz.component';

export const routes: Routes = [
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:LoginComponent},
    {path:'register',component:FormComponent},
    {path:'home',component:HomeComponent,canActivate:[authGuard]},
    {path:'dashboard',component:DashboardComponent,canActivate:[authGuard]},
    {path:'quiz',component:QuizFormComponent},
    {path:'create-quiz',component:CreateQuizComponent}
    // {path:'**',component:ErrorPageComponent}
];
