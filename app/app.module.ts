import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/SettingPages/settings/settings.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { NgxSpinnerModule } from 'ngx-spinner';
import { RequestsComponent } from './pages/RequetPages/requests/requests.component';
import { CategoriesComponent } from './pages/SettingPages/CategoryPages/categories/categories.component';
import { ProductsComponent } from './pages/SettingPages/ProductsPages/products/products.component';
import { EditproductComponent } from './pages/SettingPages/ProductsPages/editproduct/editproduct.component';
import { DataTablesModule } from 'angular-datatables';
import { NewproductComponent } from './pages/SettingPages/ProductsPages/newproduct/newproduct.component'; 
import { NewuserComponent } from './pages/SettingPages/Users/newuser/newuser.component'; 
import { EditusersComponent } from './pages/SettingPages/Users/editusers/editusers.component';
import { UserslstComponent } from './pages/SettingPages/Users/userslst/userslst.component';
import { RoleMenusComponent } from './pages/SettingPages/role-menus/role-menus.component';
import { RoleMenuUserComponent } from './pages/SettingPages/role-menu-user/role-menu-user.component';
import { BreadcrumbComponent } from './pages/breadcrumb/breadcrumb.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SettingsComponent,
    RequestsComponent,
    CategoriesComponent,
    ProductsComponent,
    EditproductComponent,
    NewproductComponent, 
    NewuserComponent, 
    EditusersComponent, UserslstComponent, RoleMenusComponent, RoleMenuUserComponent, BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,NgxSpinnerModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
