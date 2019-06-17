import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators'; 
import { DataService } from 'src/app/Data/data.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private httpClient: HttpClient,private dataService:DataService) { }

    Login(email: string, password: string) {

        var http = new HttpHeaders().set('email', email).set('password', password);

        return this.httpClient.post<{ email: string, access_token: string }>( this.dataService.url +'/Auth/Login', '', { headers: http }).pipe(tap(res => {
           
            localStorage.setItem('access_token', res.access_token);
            localStorage.setItem('email', res.email);

        }))
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('email');

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
}
