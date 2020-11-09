import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/Entity/loginDto';
import { SessionService } from 'src/app/Services/session/session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() loginForm: EventEmitter<any> = new EventEmitter();

  invalidLogin: Boolean;
  loginDto: LoginDto = new LoginDto();
  public emailValidation = '';
  public Validating = '';

  constructor(
    private router: Router,
    private loginService: LoginService,
    private session: SessionService
    
  ) {}

  ngOnInit() {
    this.checkLogin();
  }

  login() {
    this.loginForm.emit();
  }

  singIn() {
    var user = { access: 0, user: '' };
    var validateEmail: boolean = false;

    var permissions:any = {
      resourceId:'',
      resourceName:'',
      iconClass:'',
      routePath:'',
      parentResourceId:'',
      precedenceLevel:'',
      resourceOrder:'',
      access:'',    }

      var childPermission:any;

    // Validating the Email
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        this.loginDto.username
      )
    ) {
      validateEmail = true;
    }

    if (validateEmail) {
      this.loginService.signIn(this.loginDto).subscribe(
        (res) => {
          if (res.success) {
            user.access = 1;
            user.user = this.loginDto.username;
            permissions = res.data.permissions;

            // if(res.data.permissions == false){

            //   location.replace('/not-permission');
            // }

            // console.log(res);
            

            localStorage.setItem('serviceUserId', res.data.serviceUserId);
            localStorage.setItem('providerId', res.data.providerId);
            localStorage.setItem('serviceUserTypeId', res.data.serviceUserTypeId);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('permissions',JSON.stringify(permissions));


            if(localStorage.getItem('permissions') == 'false'){
              location.replace('/empty-page');
            }else if(localStorage.getItem('permissions') !== 'false'){
              location.replace('/khottodashboard');
            }

            

            console.log(res.data.permissions);

          }
        },
        (error) => {
          this.Validating = 'Enter Valid Information.';
        }
      );
    } else {
      this.emailValidation = 'You have entered an invalid email address!';
    }
  }

  checkLogin(){

    var user = JSON.parse(localStorage.getItem('user'));
    if(user !== null){

      if(localStorage.getItem('permissions') == 'false'){
        location.replace('/empty-page');
      }else if(localStorage.getItem('permissions') !== 'false'){
        location.replace('/khottodashboard');
      }

      console.log(localStorage.getItem('permissions'));
      
    }
  }
}
