import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from "@angular/router";
import { AuthGuard } from '../../../../Auth/auth.guard';
import { DataService } from '../../../../Data/data.service';

import { NgxSpinnerService } from 'ngx-spinner';
import { Subject } from 'rxjs';
import { IProducts } from 'src/app/Interfaces/IProducts';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
    IsloggedIn: boolean = false;

    dtOptions: DataTables.Settings = {};
    dtTrigger = new Subject();

    products: IProducts[];
    constructor(private authService: AuthGuard, private dataService: DataService,
        private spinner: NgxSpinnerService, private router: Router) { }

    ngOnInit() {


        if (!this.authService.loggedIn()) {
            this.router.navigate(['home']);
        } else {
            this.spinner.show();
            this.dataService.GetProducts().subscribe((res: IProducts[]) => {
                if (res == null) {
                    this.spinner.hide();
                    this.authService.logout();
                    this.router.navigate(['login']);
                }
                this.products = res;
                this.dtTrigger.next();

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

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10, responsive: true
        };

    }


    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }
}
