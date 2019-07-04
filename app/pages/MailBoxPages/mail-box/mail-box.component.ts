import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MenusInfo } from 'src/app/Interfaces/MenusInfo';
import { AuthGuard } from 'src/app/Auth/auth.guard';

@Component({
  selector: 'app-mail-box',
  templateUrl: './mail-box.component.html',
  styleUrls: ['./mail-box.component.css']
})
export class MailBoxComponent implements OnInit {

  constructor(private router: Router, private spinner: NgxSpinnerService, private authGuard: AuthGuard) {
    // this.menuInfo = JSON.parse(localStorage.getItem("MenusInfo"));
   // this.propagteDrawMenu.emit();
 
   }
 
   @Output() propagteDrawMenu: EventEmitter<any> = new EventEmitter();
 
   menuInfo: MenusInfo;
   menuInfoAll: MenusInfo[];
   ngOnInit() {
     if(this.authGuard.loggedIn() == false)
     {
       this.router.navigate(['/login']);
       return;
     }
 
     this.spinner.hide();
     if (localStorage.getItem("MenusInfo") != undefined) {
       debugger
       this.menuInfoAll = JSON.parse(localStorage.getItem("MenusInfo"));
 
       for (let index = 0; index < this.menuInfoAll.length; index++) {
         if (this.menuInfoAll[index].menuPah.indexOf('mailbox') > 0) {
           this.menuInfo = this.menuInfoAll[index];
         }
       }
       this.propagteDrawMenu.emit();
     }else{
       this.authGuard.DrawSideMenu().subscribe((res: MenusInfo) => {
 
         this.menuInfoAll = JSON.parse(localStorage.getItem("MenusInfo"));
 
       for (let index = 0; index < this.menuInfoAll.length; index++) {
         if (this.menuInfoAll[index].menuPah.indexOf('mailbox') > 0) {
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
