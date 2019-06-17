import { Component, OnInit } from '@angular/core';
import { ICategory } from 'src/app/Interfaces/ICategory';
import { DataService } from '../../../../Data/data.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: ICategory[];

  constructor(private data: DataService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.data.GetCategories().subscribe((res: ICategory[]) => {

      this.categories = res;
      this.spinner.hide();
    });

  }

}
