import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { environment } from '../../environments/environment';

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
  slovakiaCities = ['Bratislava', 'Kosice', 'Nitra'];
  czechiaCities = ['Prague', 'Brno', 'Olomouc'];
  czechiaTrue: boolean;
  slovakiaTrue: boolean;
  selectedCity: string | null = null;
  countrySelect: FormGroup;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.countrySelect = this.fb.group({
        countrySelection: [null, [Validators.required]],
        citySelection: [null, [Validators.required]],
      }
    );

    this.countrySelect.valueChanges.subscribe(data => {
      this.selectedCity = data.citySelection;
      if (data.countrySelection === 'czechia') {
        this.czechiaTrue = true;
        this.slovakiaTrue = false;
      } else if (data.countrySelection === 'slovakia') {
        this.slovakiaTrue = true;
        this.czechiaTrue = false;
      }
      if (this.selectedCity !== null) {
        this.loadData();
      }
    });
    this.dataSource = new MatTableDataSource([]);
  }

  loadData(): void {
    this.http.get<WeatherData>(
      'https://community-open-weather-map.p.rapidapi.com/weather',
      {
        params: {
          q: this.selectedCity,
          units: 'metric'
        },
        headers: {
          'X-RapidAPI-Key': environment.apiKey,
          'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
        }
      }
    ).subscribe((data) => {
      this.dataSource.data = [data];
    });
  }
}
