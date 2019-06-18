import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from 'src/app/Auth/auth.guard';
import { DataService } from 'src/app/Data/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ISec_Roles } from 'src/app/Interfaces/ISec_Roles';
import { NgForm } from '@angular/forms';
import { ISec_RoleMenu } from 'src/app/Interfaces/ISec_RoleMenu'; 
import { ISec_Users } from 'src/app/Interfaces/ISec_Users';
import { ISec_RoleMenuUser } from 'src/app/Interfaces/ISec_RoleMenuUser';
import { ISec_RoleMenu_Main } from 'src/app/Interfaces/ISec_RoleMenu.1';

@Component({
  selector: 'app-role-menu-user',
  templateUrl: './role-menu-user.component.html',
  styleUrls: ['./role-menu-user.component.css']
})
export class RoleMenuUserComponent implements OnInit {
  IsloggedIn: boolean = false;

  Users: ISec_Users[];
  Roles: ISec_Roles[];

  User: ISec_Users = {
    UserName: '',
    password: '',
    isActive: false,
    roleId: 0,
    mobile: '',
    email: '',
    address: '',
    tel: '',
    Isdeleted: false,
    FullName: '',
    Department: 0,
    image: '',
    userId: 0,
    guid: '',
    DepartmentName: '',
    RoleName: ''
  };
  iSec_RoleMenu_Main: ISec_RoleMenuUser = {
    guid: '',
      UserId:0,
    roleMenu: [{
      IsChecked: false,
      menuId: 0,
      menuTitleAr: '',
      menuTitleEn: '',
      roleId: 0,
      roleMenuId: 0,
      startupPage_menuId: false
    }]
  }; 
  constructor(private router: Router, private route: ActivatedRoute,
    private authService: AuthGuard, private dataService: DataService
    , private spinner: NgxSpinnerService) {

  }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.IsloggedIn = true;
    } else {
      this.IsloggedIn = false;
    }
    this.spinner.show();

    this.dataService.GetUsers().subscribe((res: ISec_Users[]) => {
      ;
      if (res === null) {
        this.spinner.hide();
        this.authService.logout();
        this.router.navigate(['login']);
      }
      else {
        this.Users = res;
        this.spinner.hide();
      }
    }, (error: any) => {
      this.spinner.hide();
    });

    this.spinner.show();

    this.dataService.GetRoles().subscribe((res: ISec_Roles[]) => {
      ;
      if (res === null) {
        this.spinner.hide();
        this.authService.logout();
        this.router.navigate(['login']);
      }
      else {
        this.Roles = res;
        this.spinner.hide();
      }
    }, (error: any) => {
      this.spinner.hide();
    });



  }
  rol = 0;

  onChange(newValue) {
    // this.role.roleId = newValue;
    this.rol = this.Users.find(x => x.userId == newValue).roleId;

    this.iSec_RoleMenu_Main.UserId = newValue;
    this.spinner.show();
    this.dataService.GetRolesMenuUserId(newValue).subscribe((res: ISec_RoleMenu_Main) => {
      ;
      if (res === null) {
        this.spinner.hide();
        this.authService.logout();
        this.router.navigate(['login']);
      }
      else {
        this.iSec_RoleMenu_Main.roleMenu = res.roleMenu;
        this.iSec_RoleMenu_Main.guid = res.guid;
        this.spinner.hide();
      }
    }, (error: any) => {
      this.spinner.hide();
    });

  }


  onChkChange(values, item: ISec_RoleMenu) {
    this.iSec_RoleMenu_Main.roleMenu.find(x => x.menuId == item.menuId).IsChecked = values.currentTarget.checked;
  }
  onSubmit(loginForm: NgForm) {
    console.log(loginForm.value);
    if (loginForm.valid) {
      this.spinner.show();
      
      this.dataService.SaveRoleMenusUsers(this.iSec_RoleMenu_Main).subscribe((res:any) => {

        if (res === null ||  res == -10) {
          this.spinner.hide();
          this.authService.logout();
          this.router.navigate(['login']);
        }
        else {
          this.spinner.hide();
          alert(res);
        }
      }, (error: any) => {
        this.spinner.hide();
      });

    }
  }

  choose(val) {  
    if(this.iSec_RoleMenu_Main.roleMenu.find(x => x.menuId == val).IsChecked ===false)
    {
      alert("you should select this menu first");  
      this.iSec_RoleMenu_Main.roleMenu.find(x => x.menuId == val).IsChecked = true;
    }
    
    this.iSec_RoleMenu_Main.roleMenu.forEach(element => {
      element.startupPage_menuId = false;
    });

    this.iSec_RoleMenu_Main.roleMenu.find(x => x.menuId == val).startupPage_menuId = true;
 
  }


}
