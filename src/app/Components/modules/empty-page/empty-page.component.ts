import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-empty-page',
  templateUrl: './empty-page.component.html',
  styleUrls: ['./empty-page.component.scss']
})
export class EmptyPageComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  onLogOut(){
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
      window.localStorage.removeItem('discountId');
      window.localStorage.removeItem('bannerId');
      window.localStorage.removeItem('childPermission');

      this.router.navigateByUrl('/login');
  }

}
