import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProducts } from '../Interfaces/IProducts';
import { ISec_Users } from '../Interfaces/ISec_Users';
import { ISec_RoleMenu } from '../Interfaces/ISec_RoleMenu';
import { ISec_RoleMenu_Main } from '../Interfaces/ISec_RoleMenu.1';

@Injectable({
    providedIn: 'root'
})
export class DataService {


    url = 'http://localhost:4222/api/';

    constructor(private httpClient: HttpClient) { }

    GetProducts() {
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token')).set('email', localStorage.getItem('email'));


        return this.httpClient.get(this.url + 'Products',
            { headers: headers }
        );
    }

    GetProduct(id: number) {
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token')).set('email', localStorage.getItem('email'));


        return this.httpClient.get(this.url + 'Products/' + id,
            { headers: headers }
        );
    }

    SaveProduct(product: IProducts) {
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token'))
            .set('email', localStorage.getItem('email'))
            .set('guid', product.guid);


        let p = {
            ProductID: product.ProductID,
            ProductName: product.ProductName,
            SupplierID: product.SupplierID,
            CategoryID: product.CategoryID,
            QuantityPerUnit: product.QuantityPerUnit,
            UnitPrice: product.UnitPrice,
            UnitsInStock: product.UnitsInStock,
            UnitsOnOrder: product.UnitsOnOrder,
            ReorderLevel: product.ReorderLevel,
            Discontinued: product.Discontinued,
            guid: product.guid
        };

        return this.httpClient.put(this.url + 'Products/' + product.ProductID, p,
            { headers: headers }
        );
    }

    GetGU() {
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token'))
            .set('email', localStorage.getItem('email'));

        return this.httpClient.get(this.url + 'Products/GetGu',
            { headers: headers }
        );
    }

    SaveNewProduct(product: IProducts) {
        
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token'))
            .set('email', localStorage.getItem('email'))
            .set('guid', product.guid);


        let p = {
            ProductID: product.ProductID,
            ProductName: product.ProductName,
            SupplierID: product.SupplierID,
            CategoryID: product.CategoryID,
            QuantityPerUnit: product.QuantityPerUnit,
            UnitPrice: product.UnitPrice,
            UnitsInStock: product.UnitsInStock,
            UnitsOnOrder: product.UnitsOnOrder,
            ReorderLevel: product.ReorderLevel,
            Discontinued: product.Discontinued,
            guid: product.guid
        };

        return this.httpClient.post(this.url + 'Products', p,
            { headers: headers }
        );
    }
    uploadImage(formData: FormData) {
        
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token'))
            .set('email', localStorage.getItem('email'));

        return this.httpClient.post(this.url + 'upload', formData,
            { headers: headers });

    }

    GetCategories() {
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token')).set('email', localStorage.getItem('email'));

        return this.httpClient.get(this.url + 'Category',
            { headers: headers }
        );
    }

    GetDepartments() {
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token')).set('email', localStorage.getItem('email'));

        return this.httpClient.get(this.url + 'Departments',
            { headers: headers }
        );
    }

    GetCategoryProducts(id: number) {
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token')).set('email', localStorage.getItem('email'));
        

        return this.httpClient.get(this.url + 'Category/GetCategoryProducts/' + id,
            { headers: headers }
        );
    }

    GetUsers() {
        
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token')).set('email', localStorage.getItem('email'));

        return this.httpClient.get(this.url + 'Users',
            { headers: headers }
        );
    }
    GetUsersId(id: number) {
        
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token')).set('email', localStorage.getItem('email'));


        return this.httpClient.get(this.url + 'users/' + id,
            { headers: headers }
        );
    }

    SaveUsers(user: ISec_Users) {
        
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token'))
            .set('email', localStorage.getItem('email'))
            .set('guid', user.guid);


        let p = {
            UserName: user.UserName,
            password: user.password,
            isActive: user.isActive,
            roleId: user.roleId,
            mobile: user.mobile,
            email: user.email,
            address: user.address,
            tel: user.tel,
            Isdeleted: user.Isdeleted,
            FullName: user.FullName,
            Department: user.Department,
            image: user.image,
            userId: user.userId,

            guid: user.guid
        };

        return this.httpClient.put(this.url + 'users/' + user.userId, p,
            { headers: headers }
        );
    }

    SaveNewUsers(user: ISec_Users) {
        
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token'))
            .set('email', localStorage.getItem('email'))
            .set('guid', user.guid);


        let p = {
            UserName: user.UserName,
            password: user.password,
            isActive: user.isActive,
            roleId: user.roleId,
            mobile: user.mobile,
            email: user.email,
            address: user.address,
            tel: user.tel,
            Isdeleted: user.Isdeleted,
            FullName: user.FullName,
            Department: user.Department,
            image: user.image,
            userId: user.userId,

            guid: user.guid
        };

        return this.httpClient.post(this.url + 'users', p,
            { headers: headers }
        );
    }

    GetRoles() {
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token')).set('email', localStorage.getItem('email'));

        return this.httpClient.get(this.url + 'Roles',
            { headers: headers }
        );
    }


    GetRolesId(id) {
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token')).set('email', localStorage.getItem('email'));

        return this.httpClient.get(this.url + 'Roles/' + id,
            { headers: headers }
        );
    }
  
    SaveRoleMenus(user: ISec_RoleMenu_Main) {
        
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token'))
            .set('email', localStorage.getItem('email'))
            .set('guid', user.guid);
          
        return this.httpClient.post(this.url + 'Roles', user,
            { headers: headers }
        );
    }

    GetRolesMenuUserId(id) {
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token')).set('email', localStorage.getItem('email'));

        return this.httpClient.get(this.url + 'RoleMenuUser/' + id,
            { headers: headers }
        );
    }

    SaveRoleMenusUsers(user: ISec_RoleMenu_Main) {
        
        var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token'))
            .set('email', localStorage.getItem('email'))
            .set('guid', user.guid);
          
        return this.httpClient.post(this.url + 'RoleMenuUser/', user,
            { headers: headers }
        );
    }

 
}
