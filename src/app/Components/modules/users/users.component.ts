import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';

export interface PeriodicElement {
  fistName: string;
  lastName: string;
  mobile: any;
  email: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {fistName: 'lakshitha', lastName: 'madushanka', mobile: '0773907283', email: 'kgalmadushanka@mail.com'},
];

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['firstName', 'lastName', 'mobile', 'email'];
  dataSource = ELEMENT_DATA;

}

