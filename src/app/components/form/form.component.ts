import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup,AbstractControl, ReactiveFormsModule, Validators, ValidatorFn, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { registerPostData } from '../../interfaces/auth';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule,RouterLink,ButtonModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  private registerService=inject(AuthService)
  private messageService=inject(MessageService)
  private router=inject(Router)
  constructor(private authService:AuthService){}
  registerForm: any;
  
 

  loginPage(){
    this.router.navigate(['/login'])
  }
  

  ngOnInit():void{
    this.registerForm=new FormGroup({
    firstName: new FormControl('',[Validators.required]),
    mailType: new FormControl('',Validators.required),
    mail: new FormControl('',[Validators.required,Validators.email]),
    phnNo: new FormControl('',Validators.required),
    dob: new FormControl('',Validators.required),
    addr:new FormControl('',Validators.required),
    pwd: new FormControl('',Validators.required),
    rPwd: new FormControl('',Validators.required),
  },{
    validators: this.passWordChecker
  });
}
  passWordChecker: ValidatorFn=(form:AbstractControl):ValidationErrors | null =>{
    const pwd=form.get('pwd')?.value;
    const rPwd=form.get('rPwd')?.value;
    return pwd===rPwd?null :{mismatch:true};
  }
  onRegister(){
    const postData={...this.registerForm.value};
    delete postData.rPwd;
    this.registerService.registerUser(postData as registerPostData).subscribe(
      {
        next:(response)=>{
          
          this.messageService.add({
            severity:'success',
            summary:'Success',
            detail:'Registered Successfully'
          });
          this.router.navigate(['login'])
          console.log(response);
        },
        error:(err)=>{
          this.messageService.add({
            severity:'error',
            summary:'Error',
            detail:'Invalid Mail or Password'
          });
          console.log(err);
        },
      }
    )

    
  }

}
