import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthGuard } from '../../../../Auth/auth.guard';
import { DataService } from '../../../../Data/data.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { ISec_Users } from 'src/app/Interfaces/ISec_Users';

@Component({
  selector: 'app-userslst',
  templateUrl: './userslst.component.html',
  styleUrls: ['./userslst.component.css']
})
export class UserslstComponent implements OnInit {
  IsloggedIn: boolean = false;

  dtOptions1: DataTables.Settings = {};
  dtTrigger1 = new Subject();
  imagesrc: string;
  users: ISec_Users[];
  constructor(private authService: AuthGuard, private dataService: DataService,
    private spinner: NgxSpinnerService, private router: Router) {

  }

  ngOnInit() {
    if(this.authService.loggedIn() == false)
    {
      this.router.navigate(['/login']);
      return;
    }
    
    if (!this.authService.loggedIn()) {
      this.router.navigate(['home']);
    } else {

      this.imagesrc = this.dataService.url.replace("api", '');
      this.spinner.show();

      this.dataService.GetUsers().subscribe((res: ISec_Users[]) => {
        
        if (res == null) {
          this.spinner.hide();
          this.authService.logout();
          this.router.navigate(['login']);
        }
        this.users = res;

        this.dtTrigger1.next();

      },
        (err) => {
          this.spinner.hide();
          this.authService.logout();
          this.router.navigate(['home']);
          console.log(err);
        }
        , () => {
          this.spinner.hide();
        });
    }

    if (this.authService.loggedIn()) {
      this.IsloggedIn = true;
    } else {
      this.IsloggedIn = false;
    }

    this.dtOptions1 = {
      pagingType: 'full_numbers',
      pageLength: 10
    };

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger1.unsubscribe();
  }

}
