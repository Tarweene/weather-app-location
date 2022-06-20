import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})
export class WeatherAppComponent implements OnInit {

  apiData: any;

  constructor(
    private http: HttpClient,
    ) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.http.get(
      'https://community-open-weather-map.p.rapidapi.com/weather',
      {
        params: {
          q: 'London,uk',
          units: 'metric'
        },
        headers: {
          'X-RapidAPI-Key': '4f4ad942cfmshc9bd006f0884cfap176854jsnaf05d9861dba',
          'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
        }
      }
    ).subscribe((data) => {
      console.log(data);
      this.apiData = data;
    });
  }
}
