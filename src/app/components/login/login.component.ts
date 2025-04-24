import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  private authService=inject(AuthService)
  private router=inject(Router)
  private messageService=inject(MessageService)
  // constructor(private router:Router,private authService:AuthService){}

  loginForm:any
  ngOnInit():void{
    this.loginForm=new FormGroup({
      mail: new FormControl('',[Validators.required,Validators.email]),
      pwd: new FormControl('',Validators.required),
    })
  }


  onLogin() {
    const mail=this.loginForm.get('mail')?.value;
    const pwd=this.loginForm.get('pwd')?.value;
    this.authService.getUserDetails(mail,pwd).subscribe({
      next:response=>{
        if(response&&response.length>0)
        {
          console.log(response)
          localStorage.setItem('loggedInUser',JSON.stringify(response[0]))
          sessionStorage.setItem('mail',mail);
          //to check the domain for admin and student portal
          if(mail==='supb@deloitte.com')
          {
            this.router.navigate(['dashboard'])
          }
          else{
          this.router.navigate(['home'])
          }
        }
        else{
          this.messageService.add({
            severity:'error',
            summary:'Error',
            detail:'Invalid email or password'
          });
          
        }
      },
      error:(err)=>{
        this.messageService.add({
          severity:'error',
          summary:'Error',
          detail:'Something went wrong'
        });
        console.log(err)
      }
    })

  }

}
