import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Otp } from 'src/app/entity/otp';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  otp: Otp = new Otp;
  loadRestPassword:Boolean;

  constructor(private loginService : LoginService,private router: Router) { }

  ngOnInit(): void {
  }

  sendOtp(){
    this.otp.reason='reset';
    localStorage.removeItem("email");
    this.loginService.sendOTP(this.otp).subscribe(res=>{
      if(res.success){
         this.loadRestPassword = true;
         localStorage.setItem("email" , this.otp.sentTo);
         this.router.navigate(['reset-password']);
      }
    })
  }

}
