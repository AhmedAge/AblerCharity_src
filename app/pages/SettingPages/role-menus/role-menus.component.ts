import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuard } from 'src/app/Auth/auth.guard';
import { DataService } from 'src/app/Data/data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ISec_Roles } from 'src/app/Interfaces/ISec_Roles';
import { NgForm } from '@angular/forms';
import { ISec_RoleMenu } from 'src/app/Interfaces/ISec_RoleMenu';
import { ISec_RoleMenu_Main } from 'src/app/Interfaces/ISec_RoleMenu.1';

@Component({
  selector: 'app-role-menus',
  templateUrl: './role-menus.component.html',
  styleUrls: ['./role-menus.component.css']
})
export class RoleMenusComponent implements OnInit {
  IsloggedIn: boolean = false;
  role: ISec_Roles = {
    roleId: 0,
    roleName: ''
  };
  Roles: ISec_Roles[];
  iSec_RoleMenu_Main: ISec_RoleMenu_Main = {
    guid: '',
    roleMenu: [{
      IsChecked: false,
      menuId: 0,
      menuTitleAr: '',
      menuTitleEn: '',
      roleId: 0,
      roleMenuId: 0,
      startupPage_menuId: false,
     parentmenuId:0
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


  onChange(newValue) {
    this.role.roleId = newValue;

    this.spinner.show();
    this.dataService.GetRolesId(newValue).subscribe((res: ISec_RoleMenu_Main) => {
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
      this.dataService.SaveRoleMenus(this.iSec_RoleMenu_Main).subscribe((res: ISec_Roles[]) => {

        if (res === null) {
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


}
