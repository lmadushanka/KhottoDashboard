import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { LoginDto } from 'src/app/entity/loginDto';
import { SessionService } from 'src/app/services/session/session.service';
import { CategoryService } from 'src/app/services/category/category.service';

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
    // this.session.sessionCheck();
    var user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      window.localStorage.removeItem('user');
    }
  }

  login() {
    this.loginForm.emit();
  }

  

  singIn() {
    var user = { access: 0, user: '' };
    var validateEmail: boolean = false;

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

            localStorage.setItem('serviceUserId', res.data.serviceUserId);
            localStorage.setItem('providerId', res.data.providerId);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(user));

            // this.router.navigateByUrl('/dashboard');
            location.replace('/dashboard');
          }
        },
        (error) => {
          this.Validating = 'Enter Valid Informations.';
        }
      );
    } else {
      this.emailValidation = 'You have entered an invalid email address!';
    }
  }
}



