import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../Data/data.service';
import { tap } from 'rxjs/operators'; 
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private _canActivate: boolean = false;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token')).set('email', localStorage.getItem('email'));

    let p = {
      email: localStorage.getItem("email").split('@')[0],
      url: state.url
    };
    return this.httpClient.post<boolean>(this.dataService.url + 'HaveAccess', p,
      { headers: headers }).pipe(map(response => {
        if(response == false)
        { 
          alert("You are not Authorized to Access this Page");
            //  this.router.navigate(['/home']);
        }
          return response;
          // else{
          //   this.logout();
          //   this.router.navigate(['/login']);
          //   return false;
          // }
      }));

  }

  constructor(private httpClient: HttpClient, private dataService: DataService,private router:Router) { }


  Login(email: string, password: string) {

    var http = new HttpHeaders().set('email', email).set('password', password);

    return this.httpClient.post<{ email: string, access_token: string }>(this.dataService.url + 'Auth/Login', '', { headers: http }).pipe(tap(res => {

      localStorage.setItem('access_token', res.access_token);
      localStorage.setItem('email', res.email);
    }))
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
    localStorage.removeItem('MenusInfo');

    //should delete form db auth table
  }

  register(email: string, password: string) {
    return this.httpClient.post<{ access_token: string }>('http://www.your-server.com/auth/register', { email, password }).pipe(tap(res => {
      this.Login(email, password)
    }))
  }

  public loggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  DrawSideMenu() {
    if(this.loggedIn() == false)
    {
      this.router.navigate(['/login']);
      return;
    }

    var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token')).set('email', localStorage.getItem('email'));

    return this.httpClient.get(this.dataService.url + 'DrawMenu/GetString/' + localStorage.getItem("email").split('@')[0],
      { headers: headers }
    );

  }


}
