import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MeteoService } from 'src/app/services/meteo/meteo.service';

@Component({
  selector: 'app-meteo',
  templateUrl: './meteo.component.html',
  styleUrls: ['./meteo.component.css']
})
export class MeteoComponent implements OnInit {

  @Output() loadingChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  public meteoData: any;

  constructor(private meteo: MeteoService) { }

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition(geo => {
      this.meteo.getMeteoByLatLon(geo.coords.latitude,geo.coords.longitude).subscribe(
        (res) => {
          let list = res.properties.timeseries;
          while (list.length > 24) {
            list.pop()
          }
          list.map(x => {
            x.time = (new Date(x.time)).toLocaleString('en-GB');
          })
          this.meteoData = list;
          this.updateLoading(false);
        },
        (err) => {
          console.log(err);
        }
      )
    })
  }

  updateLoading(loading: boolean) {
    this.loadingChange.emit(loading);
  }
}
