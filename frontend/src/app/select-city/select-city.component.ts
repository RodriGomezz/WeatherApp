import { Component } from '@angular/core';
import { WeatherService } from './select-city.service';

@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.sass'],
})
export class SelectCityComponent {
  isWeatherLoaded = false;
  weather: any;
  model = {
    country: '',
    city: '',
  };
  error = '';
  selectedValue = 'metric';
  grade = '';
  windSpeed = '';
  time: any;
  sunset: any;
  sunrise: any;
  captchaRes = '';
  showSpinner = false

  constructor(private weatherService: WeatherService) {}

  resolved(captchaResponse: string) {
    this.captchaRes = captchaResponse;
  }
  // Request the data from api weather
  cityApi(cities: any) {
      if (this.model.country && this.model.city && this.captchaRes ) {
        this.showSpinner = true
        this.weatherService
          .citiesApi(cities.country, cities.city, this.selectedValue)
          .subscribe({
            next: (res) => {
              this.weather = res;
              if (this.selectedValue === 'metric') {
                this.grade = 'C';
                this.windSpeed = 'm/s';
              } else {
                this.grade = 'F';
                this.windSpeed = 'mph';
              }
              this.isWeatherLoaded = true;
              this.showSpinner = false 
            },
            error: (errorMessage) => {
              this.error = errorMessage;
              this.showSpinner = false 
            },
          });
          this.error = '';
        } else if (!this.captchaRes) {
          this.error = 'you must complete the captcha';
        } else if (!this.model.country) {
          this.error = 'Introduce a country';
        } else if (!this.model.city) {
          this.error = 'Introduce a city';
        } 
      }
    }
    