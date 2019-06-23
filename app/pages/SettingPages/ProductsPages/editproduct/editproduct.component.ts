import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../../../../Auth/auth.guard';

import { DataService } from '../../../../Data/data.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProducts } from 'src/app/Interfaces/IProducts';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  param: number;

  IsloggedIn: boolean = false;

  Product: IProducts={  ProductID:0,
    ProductName:'',
    SupplierID: 0,
    CategoryID: 0,
    QuantityPerUnit:'',
    UnitPrice: 0,
    UnitsInStock: 0,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: false,    guid:'' };

  error = false;

  constructor(private router: Router, private route: ActivatedRoute, 
    private authService: AuthGuard, private dataService: DataService
    , private spinner: NgxSpinnerService) {
 
    this.param = this.route.snapshot.params["id"];

  }

  ngOnInit() { 
    if (this.authService.loggedIn()) {
      this.IsloggedIn = true;
    } else {
      this.IsloggedIn = false;
    }

    this.dataService.GetProduct(this.param).subscribe((res: IProducts) => {

      this.Product = res;
    });

  }


  onSubmit(loginForm: NgForm) {
    console.log(loginForm.value);
    if (loginForm.valid) {
      this.spinner.show();


      this.dataService.SaveProduct(this.Product).subscribe(res => {
       
        if (res == 1) {
          if (this.authService.loggedIn() === true) {

            this.error = false;
            this.router.navigate(['/home/requests/products']);
          }
        } else {
          this.error = true;
          this.spinner.hide();
        }
      }, error => {
        this.error = true;
        this.spinner.hide();
      }, () => {
        this.spinner.hide();
      });
    }
  }


}
