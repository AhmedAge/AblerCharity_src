import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/Auth/auth.guard';
import { HostListener } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenusInfo } from 'src/app/Interfaces/MenusInfo';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean;
  constructor(private router: Router, private authGuard: AuthGuard, private spinner: NgxSpinnerService) { }
  email: string;
  password: string;
  IsloggedIn: boolean = false;
  error = false;

  ngOnInit() {
    this.isLoggedIn = this.authGuard.loggedIn();

    if (this.isLoggedIn === true) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }
  menuInfo: MenusInfo;

  onSubmit(loginForm: NgForm) {
    console.log(loginForm.value);
    if (loginForm.valid) {
      this.spinner.show();
      this.authGuard.Login(this.email, this.password).subscribe(res => {
        if (this.authGuard.loggedIn() === true) {

          this.error = false;

          // debugger
          this.spinner.show();

          this.authGuard.DrawSideMenu().subscribe((res: MenusInfo) => {
            debugger
            localStorage.setItem("MenusInfo", JSON.stringify(res));
            this.menuInfo = JSON.parse(localStorage.getItem("MenusInfo"));

            this.router.navigate([this.menuInfo[0].menuPah]);
          }, (error: any) => {

          });


        }
      }, error => {
        this.error = true;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      });
    }
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event) {

    this.router.navigate(['/login']);
  }

}
