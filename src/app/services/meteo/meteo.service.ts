import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthentificationService } from '../auth/authentification.service';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  private url: string = environment.url;
  constructor(private http: HttpClient, private auth: AuthentificationService) { }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'authorization': 'Bearer ' + this.auth.getToken(),
      })
    };
  }

  getMeteoByCityName(cityName: string): Observable<any> {
    return this.http.get(this.url + 'meteo/city?cityName=' + cityName, this.getHeaders())
  }

  getMeteoByLatLon(lat: Number, lng: Number): Observable<any> {
    return this.http.get(this.url + 'meteo/location?lat=' + lat + '&lng=' + lng, this.getHeaders());
  }
}
