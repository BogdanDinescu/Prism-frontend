import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
  private url: string = environment.url;
  constructor(private http: HttpClient) {}

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json',
      }),
      withCredentials: false,
    };
  }

  private getHeadersWithCredentials() {
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'authorization': 'Bearer ' + this.getToken(),
      })
    };
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  isTokenValid(): boolean {
    var token = this.getToken();
    if (token) {
      var decoded = jwt_decode(token);
      if (decoded['exp'] > Math.floor(Date.now()/1000)) {
        return true;
      }
      return false;
    }
    return false;
  }

  isAdmin(): boolean {
    var token = this.getToken();
    if (token) {
      var decoded = jwt_decode(token);
      if (decoded['role'] === 'admin') {
        return true;
      }
      return false;
    }
    return false;
  }

  getUser(): Observable<any> {
    return this.http.get(this.url + 'user',this.getHeadersWithCredentials())
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(this.url + 'user', data, this.getHeadersWithCredentials())
  }
  
  deleteUser(data: any): Observable<any> {
    return this.http.put(this.url + 'user/delete-user', data, this.getHeadersWithCredentials())
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(this.url + 'user/change-password', data, this.getHeadersWithCredentials())
  }

  register(data: any): Observable<any> {
    return this.http.post(this.url + 'user/register', data, this.getHeaders())
  }

  login(data: any): Observable<any> {
    return this.http
      .post(this.url + 'user/authenticate', data, this.getHeaders())
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('name', response.name);
        })
      );
  }
}
