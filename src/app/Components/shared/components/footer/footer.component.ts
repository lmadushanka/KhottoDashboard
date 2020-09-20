import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/Services/session/session.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentUser: string = '';

  constructor(private session: SessionService) { }

  ngOnInit(): void {
    this.session.sessionCheck();
    var user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
      this.currentUser = user.user;
    }
  }

}
