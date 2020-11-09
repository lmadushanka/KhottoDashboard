import { chainedInstruction } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/Services/session/session.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  currentUser: string = 'simon@gmail.com';

  constructor(private session: SessionService) {}

  permissions:[] = [];

  permission2 =  [];

  childPermission:any;

  public setServiceUserId:any;

  public setSetingView = false;

  ngOnInit() {

    this.session.sessionCheck();
    var user = JSON.parse(localStorage.getItem('user'));

    this.permissions = JSON.parse(localStorage.getItem('permissions'));
    this.permission2 = JSON.parse(localStorage.getItem('permissions'));

    
    this.setServiceUserId = JSON.parse(localStorage.getItem('serviceUserTypeId'));

    console.log(this.permissions);

    let i = 0;

    for(i; i < this.permissions.length; i++){
      // console.log(i);

      if(this.permission2[i].resourceName == 'Settings'){

          this.setSetingView = true;
    
          this.permissions.splice(i,1);

          this.childPermission = this.permission2[i].childResources;
          
      }
    }

    // console.log(this.permissions);
    

    


    
    // if (user != null) {
    //   this.currentUser = user.user;
    // }

    // if(this.setServiceUserId == 1){

    //   this.setSetingView = true;

    //   this.childPermission = this.permission2[12].childResources;
    //   this.permissions.splice(12,1)  

    //   console.log(this.childPermission);

    // }else if(this.setServiceUserId !== 1){

    //   this.setSetingView = false;

    //   // if(this.childPermission == undefined){
    //   //   location.replace('/not-permission');
    //   // }

    // }

  }
}
