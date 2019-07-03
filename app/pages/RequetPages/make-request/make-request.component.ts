import { Component, OnInit } from '@angular/core';
import { AuthGuard } from 'src/app/Auth/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.component.html',
  styleUrls: ['./make-request.component.css']
})
export class MakeRequestComponent implements OnInit {

  constructor(
    private authService: AuthGuard, private router: Router) { }

  ngOnInit() {

    if(this.authService.loggedIn() == false)
    {
      this.router.navigate(['/login']);
      return;
    }

    

  }

}
