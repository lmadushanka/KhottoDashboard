import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentUser: string = 'simon@gmail.com';

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      this.currentUser = user.user;
    }
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
  }

  signOut() {
    window.localStorage.removeItem('user');
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('serviceUserId');
    window.localStorage.removeItem('providerId');
    window.localStorage.removeItem('orderId');
    window.localStorage.removeItem('serviceUserTypeId');
    window.localStorage.removeItem('email');
  }
}
