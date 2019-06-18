import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthGuard } from '../../../../Auth/auth.guard';
import { DataService } from '../../../../Data/data.service';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ISec_Users } from 'src/app/Interfaces/ISec_Users';
import { IDepartments } from 'src/app/Interfaces/IDepartments';
import { ISec_Roles } from 'src/app/Interfaces/ISec_Roles';

@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.component.html',
  styleUrls: ['./newuser.component.css']
})
export class NewuserComponent implements OnInit {
  param: number;

  IsloggedIn: boolean = false;

  user: ISec_Users = {
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
    DepartmentName:'',
    RoleName:''
  };

  error = false;
  imagesrc = '';
  Departments: IDepartments[];

  role: ISec_Roles = {
    roleId: 0,
    roleName: ''
  };
  Roles: ISec_Roles[];

  constructor(private router: Router, private route: ActivatedRoute,
    private authService: AuthGuard, private dataService: DataService
    , private spinner: NgxSpinnerService) {
    this.files = [];
  }

  ngOnInit() {
    if (this.authService.loggedIn()) {
      this.IsloggedIn = true;
      this.spinner.show();

      this.dataService.GetDepartments().subscribe((res: IDepartments[]) => {
        this.Departments = res;

      }, (error: any) => {
        this.spinner.hide();
      });
      this.dataService.GetGU().subscribe((res: string) => {
        
        this.user.guid = res;
      }, (error: any) => {
        this.spinner.hide();
      });
      this.spinner.hide();

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

    } else {
      this.IsloggedIn = false;
    }
  }
  public files: any[];

  onFileChanged(event: any) {

    this.files = event.target.files;

  }

  onUpload() {
    const formData = new FormData();
    for (const file of this.files) {
      formData.append(name, file, file.name);
    }
    this.dataService.uploadImage(formData).subscribe(res => {
      
      this.user.image = res.toString();
      this.imagesrc = this.dataService.url.replace("api", '') + res.toString();

    });
  }


  onSubmit(loginForm: NgForm) {
    console.log(loginForm.value);
    if (loginForm.valid) {
      this.spinner.show();


      this.dataService.SaveNewUsers(this.user).subscribe(res => {
        ;
        if (res == -10) {
          this.error = true;
          this.authService.logout();
          this.spinner.hide();
          this.router.navigate(['/login']);
        }
        if (res >= 1) {
          if (this.authService.loggedIn() === true) {

            this.error = false;
            this.router.navigate(['/home/settings/users']);
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


  onChange(newValue) {
    console.log(newValue);
    this.user.Department = newValue;
  }


  onChangeRole(newValue){
    this.user.roleId = newValue;

  }


}
