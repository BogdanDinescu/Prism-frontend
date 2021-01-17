import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeteoService {
  private url: string = "https://api.met.no/weatherapi/locationforecast/2.0/compact"

  constructor(private http: HttpClient) { }

  private getHeaders() {
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      })
    };
  }

  getMeteoByLatLon(lat: Number, lon: Number): Observable<any> {
    return this.http.get(this.url + '?lat=' + lat + '&lon=' + lon);
  }
}
