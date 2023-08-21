import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.sass'],
  animations:[
    trigger('animateWeather', [
      transition('normal <=> movement', [
        animate(300, style({
          transform: 'translateX(-100vw)',
          opacity: 0
        })),
        animate(1, style({
          transform: 'translateX(100vw)'
        })),
        animate(300, style({
          transform: 'translateX(0)',
          opacity:1
        }))
      ])
    ]),
  ]
})
export class WeatherComponent {
  @Input() weather: any;
  @Input() grade: any;
  @Input() windSpeed: any;
  time: any;
  sunrise?: any;
  sunset?: any;
  state= 'normal'

  constructor() {}

  ngOnChanges() {
    this.time = new Date();
    this.time = new Date(
      this.time.getTime() +
        (this.time.getTimezoneOffset() + this.weather.timezone / 60) * 60000
    );

    this.sunset = new Date(this.weather.sys.sunset * 1000);
    this.sunset = new Date(
      this.sunset.getTime() +
        (this.sunset.getTimezoneOffset() + this.weather.timezone / 60) * 60000
    );

    this.sunrise = new Date(this.weather.sys.sunrise * 1000);
    this.sunrise = new Date(
      this.sunrise.getTime() +
        (this.sunrise.getTimezoneOffset() + this.weather.timezone / 60) * 60000
    );

    this.state == 'normal' ? this.state = 'movement' : this.state = 'normal'

  }
}
