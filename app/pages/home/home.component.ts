import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/Auth/auth.guard';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/Data/data.service';
import { MenusInfo } from 'src/app/Interfaces/MenusInfo';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  menuInfo: MenusInfo;
  constructor(private router: Router, private authGuard: AuthGuard,
    private spinner: NgxSpinnerService, private dataService: DataService) { }

  ngOnInit() {
    if(this.authGuard.loggedIn() == false)
    {
      this.router.navigate(['/login']);
      return;
    }

    if (this.authGuard.loggedIn() !== true) {
      this.router.navigate(['login']);
    }
    else {
      if (localStorage.getItem("MenusInfo") == undefined) {
        this.authGuard.DrawSideMenu().subscribe((res: MenusInfo) => {
          debugger
          if (res === null) {
            this.spinner.hide();
            this.authGuard.logout();
            this.router.navigate(['login']);
            return;
          }
          localStorage.setItem("MenusInfo", JSON.stringify(res));
          this.menuInfo = JSON.parse(localStorage.getItem("MenusInfo"));

          this.menuInfo[0].UserImage = this.dataService.url.replace("api", '') + this.menuInfo[0].UserImage.toString();
        }, (error: any) => {

        });
      } else {
        this.menuInfo = JSON.parse(localStorage.getItem("MenusInfo"));
        this.menuInfo[0].UserImage = this.dataService.url.replace("api", '') + this.menuInfo[0].UserImage.toString();

      }
      this.spinner.hide();
    }


  }

  onActivate() {
    this.menuInfo = JSON.parse(localStorage.getItem("MenusInfo"));
    this.menuInfo[0].UserImage = this.dataService.url.replace("api", '') + this.menuInfo[0].UserImage.toString();
    this.emitEventToChild();
  }

  public eventsSubject: Subject<string> = new Subject<string>();

  emitEventToChild() {

    this.eventsSubject.next(this.router.url)
  }

  anotherPage: boolean;
  BreadcrumbPath() {
    return this.router.url;
  }


  logout() {
    this.authGuard.logout();
    this.router.navigate(['/login']);
  }


}
