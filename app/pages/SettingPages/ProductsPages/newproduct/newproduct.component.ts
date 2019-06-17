import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../../../../Auth/auth.guard';

import { DataService } from '../../../../Data/data.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProducts } from 'src/app/Interfaces/IProducts';

@Component({
  selector: 'app-newproduct',
  templateUrl: './newproduct.component.html',
  styleUrls: ['./newproduct.component.css']
})
export class NewproductComponent implements OnInit {
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
  
  }
 
  ngOnInit() { 
    if (this.authService.loggedIn()) {
      this.IsloggedIn = true;

      this.dataService.GetGU().subscribe((res:string)=>{
      
        this.Product.guid = res;
      });

    } else {
      this.IsloggedIn = false;
    }
  }

  
  onSubmit(loginForm: NgForm) {
    console.log(loginForm.value);
    if (loginForm.valid) {
      this.spinner.show();


      this.dataService.SaveNewProduct(this.Product).subscribe(res => {
       
        if (res == 1) {
          if (this.authService.loggedIn() === true) {

            this.error = false;
            this.router.navigate(['/home/products']);
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
