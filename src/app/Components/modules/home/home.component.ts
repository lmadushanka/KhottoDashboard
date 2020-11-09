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

  setDashboardForKhotto = false;
  setDashboardForProvider = false;

  ngOnInit() {
    this.session.sessionCheck();
    this.setRefreshToken();

    if(Number(localStorage.getItem('providerId')) == 0){
      this.setDashboardForKhotto = true;
    }else if(Number(localStorage.getItem('providerId')) !== 0){
      this.setDashboardForProvider = false;
    }
  }

  setRefreshToken(){
    this.refreshTokenService.OnRefreshToken().subscribe((res) =>{
      // console.log(res.data);
      // this.router.navigateByUrl('/khottodashboard');
    },
    (error) => {
      
      window.localStorage.clear();

      this.router.navigateByUrl('/login');
    });
  }
}
