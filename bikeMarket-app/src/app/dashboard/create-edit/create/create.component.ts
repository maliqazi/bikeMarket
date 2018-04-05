import { Component, OnInit, Input } from '@angular/core';
import { Bicycle } from '../../../bicycle';
import { HttpService } from '../../../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  @Input() myUserId: any;
  bicycle = new Bicycle();

  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  }

  submitBicycle() {
    console.log('bicycle data', this.bicycle)
    console.log('input user in create', this.myUserId)

    this._httpService.postBicycle({bicycle: this.bicycle, user_id: this.myUserId})
  }
}
