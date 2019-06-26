import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../../../../Auth/auth.guard';

import { DataService } from '../../../../Data/data.service';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
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

  Product: IProducts = {
    ProductID: 0,
    ProductName: '',
    SupplierID: 0,
    CategoryID: 0,
    QuantityPerUnit: '',
    UnitPrice: 0,
    UnitsInStock: 0,
    UnitsOnOrder: 0,
    ReorderLevel: 0,
    Discontinued: false, guid: ''
  };

  error = false;

  constructor(private router: Router, private route: ActivatedRoute,
    private authService: AuthGuard, private dataService: DataService
    , private spinner: NgxSpinnerService, private formBuilder: FormBuilder) {

  }

  registerForm: FormGroup;
  submitted = false;
  get f() { return this.registerForm.controls; }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      ProductName: ['', Validators.required],
      SupplierID: ['', Validators.required],
      CategoryID: ['', Validators.required],
      QuantityPerUnit: ['', Validators.required],
      UnitPrice: ['', Validators.required],
      UnitsInStock: ['', Validators.required],
      UnitsOnOrder: ['', Validators.required],
      ReorderLevel: ['', Validators.required],
      Discontinued: ['', Validators.required],

    });


    if (this.authService.loggedIn()) {
      this.IsloggedIn = true;

      this.dataService.GetGU().subscribe((res: string) => {
        if (res == null) {
          this.spinner.hide();
          this.authService.logout();
          this.router.navigate(['login']);
        }

        this.Product.guid = res;
      });

    } else {
      this.IsloggedIn = false;
    }
  }


  onSubmit() {
    this.submitted = true;

    this.Product.CategoryID = 0;
    this.Product.ProductName = this.registerForm.controls.ProductName.value;
    this.Product.SupplierID = this.registerForm.controls.SupplierID.value;
    this.Product.CategoryID = this.registerForm.controls.CategoryID.value;
    this.Product.QuantityPerUnit = this.registerForm.controls.QuantityPerUnit.value;
    this.Product.UnitPrice = this.registerForm.controls.UnitPrice.value;
    this.Product.UnitsInStock = this.registerForm.controls.UnitsInStock.value;
    this.Product.UnitsOnOrder = this.registerForm.controls.UnitsOnOrder.value;
    this.Product.ReorderLevel = this.registerForm.controls.ReorderLevel.value;
    this.Product.Discontinued = this.registerForm.controls.Discontinued.value;
 
    
    console.log(this.registerForm.value);
  
    if (this.registerForm.valid) {
      this.spinner.show();


      this.dataService.SaveNewProduct(this.Product).subscribe(res => {
debugger
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
