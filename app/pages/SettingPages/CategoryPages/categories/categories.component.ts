import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Interfaces/ICategory';
import { DataService } from '../../../../Data/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthGuard } from 'src/app/Auth/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: ICategory[];

  constructor(private data: DataService, private spinner: NgxSpinnerService,
    
    private authService: AuthGuard, private dataService: DataService, private router: Router) {
     
     }

  ngOnInit() {
    if(this.authService.loggedIn() == false)
    {
      this.router.navigate(['/login']);
      return;
    }
    
    this.spinner.show();
    this.data.GetCategories().subscribe((res: ICategory[]) => {

      if (res == null) {
        this.spinner.hide();
        this.authService.logout();
        this.router.navigate(['login']);
    }
    this.categories = res;
      this.spinner.hide();
     
    });

  }

}
