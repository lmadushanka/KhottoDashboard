import { Component, OnInit } from '@angular/core';
import { PasswordRestDto } from 'src/app/entity/passwordRestDto';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  passwordResetDto:PasswordRestDto = new PasswordRestDto;

  constructor(private loginService : LoginService,private router: Router) { }

  ngOnInit(): void {
    
  }

  resetPassword(){
    let email = localStorage.getItem('email');
    this.passwordResetDto.sentTo = email;
    this.loginService.resetPassword(this.passwordResetDto).subscribe(res=>{
      console.log(res);
      if(res.success = true){
        alert(res.message);
        this.router.navigate(['login']);
      }
    },
    error=>{
       alert(error.error.message);
    })
  }

}