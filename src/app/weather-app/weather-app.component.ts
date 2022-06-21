import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

export interface WeatherData {
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
    humidity: number;
  };
  wind: {
    speed: number;
  };
  weather: {
    main: string;
  };
}

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.scss']
})

export class WeatherAppComponent implements OnInit {

  dataSource: MatTableDataSource<WeatherData>;
  displayedColumns: string[] = ['temp', 'temp_max', 'temp_min', 'humidity', 'speed', 'description'];

  constructor(
    private http: HttpClient,
    ) {
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource([]);
    this.loadData();
  }

  loadData(): void {
    this.http.get<WeatherData>(
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
      this.dataSource.data = [data];
    });
  }
}
