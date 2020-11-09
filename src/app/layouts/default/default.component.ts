import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/Services/session/session.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss'],
})
export class DefaultComponent implements OnInit {
  sideBarOpen = true;

  onPermission:any;

  constructor(private router: Router, private session: SessionService) {}

  ngOnInit() {
    this.session.sessionCheck();

    if(localStorage.getItem('permissions') == 'false'){
      this.onPermission = false;
    }else{
      this.onPermission = true;
    }
  }

  sideBarToggler() {

      this.sideBarOpen = !this.sideBarOpen;
    
  }

}
