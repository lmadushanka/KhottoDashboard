import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  sideBarOpen = true;

  constructor(private router: Router, private session: SessionService) {}

  ngOnInit() {
    this.session.sessionCheck();
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
