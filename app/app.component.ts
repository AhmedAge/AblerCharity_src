import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from './Auth/auth.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'AblerCharity';
  isLoggedIn: boolean;


  constructor(private router: Router, private authGuard: AuthGuard) {

  }

  ngOnInit(): void {
    // 
    this.isLoggedIn = this.authGuard.loggedIn();

    if (this.isLoggedIn !== true) {
      this.router.navigate(['/login']);

    }
  } 

}
