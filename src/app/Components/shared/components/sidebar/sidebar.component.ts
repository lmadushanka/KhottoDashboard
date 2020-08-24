import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentUser: string = 'simon@gmail.com';

  constructor(private session: SessionService) {}

  ngOnInit() {
    this.session.sessionCheck();
    var user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      this.currentUser = user.user;
    }
  }
}
