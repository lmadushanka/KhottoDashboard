import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/Services/session/session.service';
import { RefreshTokenService } from 'src/app/Services/refresh-token/refresh-token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router, private session: SessionService, private refreshTokenService: RefreshTokenService) {}

  ngOnInit() {
    this.session.sessionCheck();
    this.setRefreshToken();
  }

  setRefreshToken(){
    this.refreshTokenService.OnRefreshToken().subscribe((res) =>{
      console.log(res.data);
      this.router.navigateByUrl('/khottodashboard');
    },
    (error) => {
      window.localStorage.removeItem('user');
      window.localStorage.removeItem('token');
      window.localStorage.removeItem('serviceUserId');
      window.localStorage.removeItem('providerId');
      window.localStorage.removeItem('orderId');
      window.localStorage.removeItem('serviceUserTypeId');
      window.localStorage.removeItem('email');
      window.localStorage.removeItem('viewProviderId');
      window.localStorage.removeItem('itemId');
      window.localStorage.removeItem('permissions');
      window.localStorage.removeItem('categoryId');

      this.router.navigateByUrl('/login');
    });
  }
}
