import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MeteoService } from 'src/app/services/meteo/meteo.service';
import { PreferencesService } from 'src/app/services/preferences/preferences.service';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

  @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  public meteoData: any = {};
  public cityName: string;
  public showAlert: boolean = false;
  public math = Math;
  constructor(private meteo: MeteoService, private preferences: PreferencesService) { }

  ngOnInit(): void {
    this.preferences.getCityPreferences().subscribe(
      (res) => {
        this.cityName = res?.city;
        if (res && res.city !== null && typeof res.city !== 'undefined' && res.city !== "") {
          this.getMeteoByCityName(res.city);
        } else {
          this.getMeteoByLocation();
        }
      },
      (err) => {
        console.log(err);
      }
    )
  }

  searchCity() {
    this.updateLoading(true);
    this.preferences.setCityPreferences(this.cityName).subscribe();
    this.getMeteoByCityName(this.cityName);
  }

  getMeteoByCityName(name: string) {
    this.meteo.getMeteoByCityName(name).subscribe(
      (res) => {
        this.meteoData = res;
        this.updateLoading(false);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  getMeteoByLocation() {
    navigator.geolocation.getCurrentPosition(geo => {
      this.meteo.getMeteoByLatLon(geo.coords.latitude,geo.coords.longitude).subscribe(
        (res) => {
          this.meteoData = res;
          this.updateLoading(false);
        },
        (err) => {
          console.log(err);
        }
      )
    }, err => {
      this.displayAlert();
      this.updateLoading(false);
    })
  }

  deletePreference() {
    this.preferences.deleteCityPreferences().subscribe();
  }

  displayAlert() {
    this.showAlert = true;
    let self = this
    setTimeout(function(){ self.showAlert = false }, 3000);
  }

  dateFormat(date_string: string): string {
    let options = {
      weekday: 'long',
      year: "numeric",
      month:"2-digit",
      day:"2-digit"
    };
    let date = new Date(date_string).toLocaleString("ro-RO",options)
    return date;
  }

  updateLoading(loading: boolean) {
    this.loadingChange.emit(loading);
  }
}
