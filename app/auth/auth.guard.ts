import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DataService } from '../Data/data.service';
import { tap } from 'rxjs/operators';
import { MenusInfo } from '../Interfaces/MenusInfo';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    return this.loggedIn();
  }

  constructor(private httpClient: HttpClient, private dataService: DataService) { }


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
    var headers = new HttpHeaders().set('access_token', localStorage.getItem('access_token')).set('email', localStorage.getItem('email'));
    
    return this.httpClient.get(this.dataService.url + 'DrawMenu/GetString/' + localStorage.getItem("email").split('@')[0],
      { headers: headers }
    );

  }


}
