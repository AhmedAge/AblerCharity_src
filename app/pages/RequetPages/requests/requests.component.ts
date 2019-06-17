import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenusInfo } from 'src/app/Interfaces/MenusInfo';
import { AuthGuard } from 'src/app/Auth/auth.guard';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {

  constructor(private router: Router, private spinner: NgxSpinnerService, private authGuard: AuthGuard) {
    this.menuInfo = JSON.parse(localStorage.getItem("MenusInfo"));
    this.propagteDrawMenu.emit();

  }

  @Output() propagteDrawMenu: EventEmitter<any> = new EventEmitter();

  menuInfo: MenusInfo;
  menuInfoAll: MenusInfo[];

  ngOnInit() {
    if (localStorage.getItem("MenusInfo") != undefined) {
      this.menuInfoAll = JSON.parse(localStorage.getItem("MenusInfo"));

      for (let index = 0; index < this.menuInfoAll.length; index++) {
        if (this.menuInfoAll[index].menuPah.indexOf('requests') > 0) {
          this.menuInfo = this.menuInfoAll[index];
        }
      }
      this.propagteDrawMenu.emit();
    } else {
      this.authGuard.DrawSideMenu().subscribe((res: MenusInfo) => {
        debugger
        localStorage.setItem("MenusInfo", JSON.stringify(res));
        this.menuInfoAll = JSON.parse(localStorage.getItem("MenusInfo"));

        for (let index = 0; index < this.menuInfoAll.length; index++) {
          if (this.menuInfoAll[index].menuPah.indexOf('requests') > 0) {
            this.menuInfo = this.menuInfoAll[index];
          }
        }
      
        this.propagteDrawMenu.emit();


      }, (error: any) => {

      });
    }
  }

  navigate(comp) {
    this.router.navigate([comp]);

  }

}
