import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

const URL = 'https://weather-back-qw3i.onrender.com/';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  constructor(private http: HttpClient) {}

  citiesApi(country: any, city: any, selectedValue: any) {
    return this.http
      .get(URL + `cities/${country}/${city}/${selectedValue}`)
      .pipe(
        catchError((errorRes) => {
          let errorMessage = 'An unknown error occurred!';
          console.log(errorRes);
          switch (errorRes.error) {
            case 'Country does not exist':
              errorMessage = 'Country does not exist';
              break;
            case 'City does not exist':
              errorMessage = 'City does not exist';
              break;
          }
          return throwError(() => errorMessage);
        })
      );
  }
}
