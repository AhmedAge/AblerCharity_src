import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { SettingsComponent } from './pages/SettingPages/settings/settings.component';
import { RequestsComponent } from './pages/RequetPages/requests/requests.component';
import { CategoriesComponent } from './pages/SettingPages/CategoryPages/categories/categories.component';
import { ProductsComponent } from './pages/SettingPages/ProductsPages/products/products.component';
import { EditproductComponent } from './pages/SettingPages/ProductsPages/editproduct/editproduct.component';
import { NewproductComponent } from './pages/SettingPages/ProductsPages/newproduct/newproduct.component';
import { NewuserComponent } from './pages/SettingPages/Users/newuser/newuser.component';
import { EditusersComponent } from './pages/SettingPages/Users/editusers/editusers.component';
import { UserslstComponent } from './pages/SettingPages/Users/userslst/userslst.component';
import { RoleMenusComponent } from './pages/SettingPages/role-menus/role-menus.component';
import { RoleMenuUserComponent } from './pages/SettingPages/role-menu-user/role-menu-user.component';

const routes: Routes = [
    {
        path: 'home', component: HomeComponent,
        children: [
            {
                path: 'settings', component: SettingsComponent//,    canActivate: [AuthGuard]
            },
            {
                path: 'requests', component: RequestsComponent//,    canActivate: [AuthGuard]
            },
            {
                path: 'categories', component: CategoriesComponent//,    canActivate: [AuthGuard]
            },
            {
                path: 'products', component: ProductsComponent//,    canActivate: [AuthGuard]
            },
            {
                path: 'products/:id', component: EditproductComponent//,    canActivate: [AuthGuard]
            },
            {
                path: 'newproduct', component: NewproductComponent//,    canActivate: [AuthGuard]
            },
            {
                path: 'users', component: UserslstComponent
            },
            {
                path: 'users/:id', component: EditusersComponent
            },
            {
                path: 'newuser', component: NewuserComponent//,    canActivate: [AuthGuard]
            },
            {
                path: 'rolemenu', component: RoleMenusComponent//,    canActivate: [AuthGuard]
            },
            {
                path: 'rolemenuuser', component: RoleMenuUserComponent//,    canActivate: [AuthGuard]
            }
        ]
    },
    { path: 'login', component: LoginComponent },

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
