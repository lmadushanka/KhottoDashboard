import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { RefreshTokenService } from 'src/app/Services/refresh-token/refresh-token.service';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/Services/session/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: string = 'simon@gmail.com';

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private session: SessionService, private refreshTokenService: RefreshTokenService) {}

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      this.currentUser = user.user;
    }
    
    this.setRefreshToken();

    if(localStorage.getItem('permissions') == 'false'){
      this.router.navigateByUrl('empty-page');
    }
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  signOut() {
    window.localStorage.clear();
  }

  setRefreshToken(){
    this.refreshTokenService.OnRefreshToken().subscribe((res) =>{
      console.log(res.data);
      // this.router.navigateByUrl('/khottodashboard');
    },
    (error) => {
      window.localStorage.clear();

      this.router.navigateByUrl('/login');
    });
  }
}
