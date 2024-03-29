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
import { MakeRequestComponent } from './pages/RequetPages/make-request/make-request.component';
import { AuthGuard } from './Auth/auth.guard';
import { MailBoxComponent } from './pages/MailBoxPages/mail-box/mail-box.component';
import { InboxComponent } from './pages/MailBoxPages/inbox/inbox.component';
import { MailSendComponent } from './pages/MailBoxPages/MailBox/mail-send/mail-send.component';

const routes: Routes = [

    {
        path: 'home', component: HomeComponent,
        children: [
            {
                path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]
            },
            {
                path: 'requests', component: RequestsComponent, canActivate: [AuthGuard]
            },
            {
                path: 'requests/makerequest', component: MakeRequestComponent, canActivate: [AuthGuard]
            },
            {
                path: 'requests/categories', component: CategoriesComponent, canActivate: [AuthGuard]
            },
            {
                path: 'requests/products', component: ProductsComponent, canActivate: [AuthGuard]
            },
            {
                path: 'requests/products/newproduct', component: NewproductComponent, canActivate: [AuthGuard]
            },
            {
                path: 'requests/products/editproduct/:id', component: EditproductComponent, canActivate: [AuthGuard]
            },
            {
                path: 'settings/users', component: UserslstComponent, canActivate: [AuthGuard]
            },
            {
                path: 'settings/users/newuser', component: NewuserComponent, canActivate: [AuthGuard]
            },
            {
                path: 'settings/users/edituser/:id', component: EditusersComponent, canActivate: [AuthGuard]
            },
            {
                path: 'settings/rolemenu', component: RoleMenusComponent, canActivate: [AuthGuard]
            },
            {
                path: 'settings/rolemenuuser', component: RoleMenuUserComponent, canActivate: [AuthGuard]
            },
            {
                path: 'mailbox', component: MailBoxComponent, canActivate: [AuthGuard]

            },
            {
                path: 'mailbox/inbox', component: InboxComponent, canActivate: [AuthGuard]
            },
            {
                path: 'mailbox/mailsend', component: MailSendComponent, canActivate: [AuthGuard]
            },
        ]
    },
    { path: 'login', component: LoginComponent },

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
