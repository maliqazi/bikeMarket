import { Component, OnInit } from '@angular/core';
import { Bicycle } from '../bicycle';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-daily-bike',
  templateUrl: './daily-bike.component.html',
  styleUrls: ['./daily-bike.component.css']
})
export class DailyBikeComponent implements OnInit {
  dailyBicycle = new Bicycle();
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    console.log('daily bike', this.dailyBicycle);

    this._httpService.getBicycles(0).subscribe( bicycles => {
      // console.log('bike', res, res.bicycle)
      let ind = Math.floor(Math.random()*bicycles.length);
      console.log('random', ind);
      this.dailyBicycle = bicycles[ind];
    })
  }
}
