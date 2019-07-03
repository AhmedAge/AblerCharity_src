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
  selector: 'app-editusers',
  templateUrl: './editusers.component.html',
  styleUrls: ['./editusers.component.css']
})
export class EditusersComponent implements OnInit {
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
    DepartmentName: '',
    RoleName:''
  };
  Departments: IDepartments[];

  role: ISec_Roles = {
    roleId: 0,
    roleName: ''
  };
  Roles: ISec_Roles[];

  error = false;
  imagesrc = '';
  constructor(private router: Router, private route: ActivatedRoute,
    private authService: AuthGuard, private dataService: DataService
    , private spinner: NgxSpinnerService) {

    this.param = this.route.snapshot.params["id"];

  }

  ngOnInit() {
    if(this.authService.loggedIn() == false)
    {
      this.router.navigate(['/login']);
      return;
    }
    
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

    this.spinner.show();

    this.dataService.GetDepartments().subscribe((res: IDepartments[]) => {
      this.Departments = res;

      this.dataService.GetUsersId(this.param).subscribe((res: ISec_Users) => {
        if (res === null) {
          this.spinner.hide();
          this.authService.logout();
          this.router.navigate(['login']);
        }
        else {
          this.user = res;

          this.imagesrc = this.dataService.url.replace("api", '') + res.image;

          this.spinner.hide();
        }
      });



    }, (error: any) => {
      this.spinner.hide();
    });



    this.spinner.hide();

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




  onChange(newValue) {

    this.user.Department = newValue;
  }


  onChangeRole(newValue) {
    this.user.roleId = newValue;

  }


  onSubmit(loginForm: NgForm) {
    console.log(loginForm.value);
    if (loginForm.valid) {
      this.spinner.show();


      this.dataService.SaveUsers(this.user).subscribe(res => {

        if (res >= 1) {
          if (this.authService.loggedIn() === true) {

            this.error = false;
            this.router.navigate(['/home/users']);
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
