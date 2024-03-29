import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../entity/globals';
import { LoginDto } from '../entity/loginDto';
import { PasswordRestDto } from '../entity/passwordRestDto';
import { Otp } from '../entity/otp';

// const httpOptions = {
//   header: new HttpHeaders({'X-API-VERSION': 'v1'})
// };


@Injectable({
  providedIn: 'root'
})


export class LoginService {

  private baseUrl = this.globals.baseUrl;

  constructor(private http: HttpClient,private globals:Globals) {
    
  }

  authenticate(username, password) {
    if (username === "javainuse" && password === "password") {
      // sessionStorage.setItem('username', username)
      return true;
    } else {
      return false;
    }
  }

  signIn(loginDto:LoginDto): Observable<any>{

    let signinUrl = this.baseUrl+'/auth/signin';
    
    return this.http.post(signinUrl,loginDto);
  }


  sendOTP(otp:Otp):Observable<any>{
    let otpUrl = this.baseUrl+'/otp/send'
    return this.http.post(otpUrl,otp);
  }

  resetPassword(passwordResetDto:PasswordRestDto):Observable<any>{
    let resetPasswordUrl = this.baseUrl+'/user/passwordReset'
    return this.http.patch(resetPasswordUrl,passwordResetDto);
  }


}
