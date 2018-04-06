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
  bicycles: Bicycle[] = [];
  // filter: Bicycle = new Bicycle();
  filter: any;

  constructor(
        private _httpService: HttpService,
        private _route: ActivatedRoute,
        private _router: Router) {
          this._route.paramMap.subscribe(
            params => {
              // console.log('params from browser', params);
              // console.log('my user id', this.myUserId); 
              this.myUserId = params.get("_id");
            }
          );
        }

  ngOnInit() {
    this.getBicycles();
  }

  getBicycles() {
    // console.log('brose bicycle', this.bicycles, this.myUserId);

    console.log('input user inbrose ', this.myUserId);

    this._httpService.getBicycles(this.myUserId).subscribe(bicycles => {
      console.log('back from promise in brose', bicycles);
      this.bicycles = bicycles;
      console.log('this bicycle', this.bicycles);
    });

    this._httpService.afterDeleteBicycle.subscribe( bicycles => {
      console.log('in observable after delete bike'); 
      this.bicycles = bicycles;
    });
  }

  seeContact(data) {
     this._httpService.getUserContact(data._user).subscribe(user => {
       console.log("back from promise seeing user contact", user);
       const str = 'Name: ' + user.first_name + ' ' + user.last_name + '\nEmail: ' + user.email;
       alert(str);
     });
  }

  deleteBicycle(data) {
    console.log('deleting bicyle', data);
    this._httpService.deleteBicycle(data);
  }
}
