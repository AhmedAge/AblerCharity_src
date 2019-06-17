import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  @Input()
  showHide: boolean = true;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {

  }

  logout() {
    this.authService.logout();
    this.router.navigate(['home']);
  }
}
