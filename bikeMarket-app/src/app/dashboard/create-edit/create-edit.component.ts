import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../../http.service';

@Component({
  selector: 'app-create-edit',
  templateUrl: './create-edit.component.html',
  styleUrls: ['./create-edit.component.css']
})
export class CreateEditComponent implements OnInit {
  myUserId: any;
  constructor(
      private _httpService: HttpService,
      private _route: ActivatedRoute,
      private _router: Router) {
          this._route.paramMap.subscribe( params => { console.log('params from create edit', params); this.myUserId=params.params._id })
      }

  ngOnInit() {

  }

}
