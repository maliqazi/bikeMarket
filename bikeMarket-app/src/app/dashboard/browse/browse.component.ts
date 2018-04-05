import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../../http.service';
import { Bicycle } from '../../bicycle';


@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css']
})

export class BrowseComponent implements OnInit {
  myUserId: any;
  bicycle = new Bicycle();
  // filter: Bicycle = new Bicycle();
  filter: any;

  constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router) {
          this._route.paramMap.subscribe( params => { console.log('params from browser', params); this.myUserId=params.params._id; console.log('my user id', this.myUserId) })
        }

  ngOnInit() {
    this.getBicycles();
  }

  getBicycles() {
    console.log('brose bicycle', this.bicycle, this.myUserId)

    console.log('input user inbrose ', this.myUserId)

    this._httpService.getBicycles(this.myUserId).then(res => {
      console.log('back from promise in brose',res);
      this.bicycle = res.bicycle;
      console.log('this bicycle', this.bicycle);
    }

    this._httpService.afterDeleteBicycle.subscribe( res => {console.log('in observable after delete bike'); this.bicycle=res.bicycle;})
  }

  seeContact(data) {
     this._httpService.getUserContact(data._user).then(res => {
       console.log("back from promise seeing user contact", res);
       let str = 'Name: ' + res.user[0].first_name + ' ' + res.user[0].last_name + '\nEmail: ' + res.user[0].email;
       alert(str);
     });
  }

  deleteBicycle(data) {
    console.log('deleting bicyle',data);
    this._httpService.deleteBicycle(data);
  }
}
