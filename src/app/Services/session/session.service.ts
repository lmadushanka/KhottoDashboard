import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor(private router: Router) {}

  sessionCheck() {
    var user = JSON.parse(localStorage.getItem('user'));
    if (user != null) {
    } else {
      this.router.navigate(['login']);
    }
  }
}
