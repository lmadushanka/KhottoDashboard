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
  public emailValidation = '';

  constructor(private loginService : LoginService,private router: Router) { }

  ngOnInit(): void {
  }

  sendOtp(){
    this.otp.reason='reset';
    localStorage.removeItem("email");

    var validateEmail: boolean = false;

    // Validating the Email
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.otp.sentTo
      )
    ) {
      validateEmail = true;
    }

    if (validateEmail) {

      this.loginService.sendOTP(this.otp).subscribe(res=>{
        if(res.success){
           this.loadRestPassword = true;
           localStorage.setItem("email" , this.otp.sentTo);
           this.router.navigate(['reset-password']);
        }
      })

    }else{
      this.emailValidation = 'You have entered an invalid email address!';
    }
  }

}
