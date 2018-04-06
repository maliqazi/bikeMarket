import { Component, OnInit, Input } from '@angular/core';
import { Bicycle } from '../../../bicycle';
import { HttpService } from '../../../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject } from 'Rxjs';


@Component({
  selector: 'app-edit-delete',
  templateUrl: './edit-delete.component.html',
  styleUrls: ['./edit-delete.component.css']
})
export class EditDeleteComponent implements OnInit {
  @Input() myUserId: any;
  bicycles: Bicycle[] = [];


  constructor(        
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
    this.getUserBicycles();
  }

  getUserBicycles() {
    console.log('edit delete bicycle', this.bicycles, this.myUserId);

    console.log('input user in edit-elete', this.myUserId);

    this._httpService.getUserBicycles(this.myUserId).subscribe(bicycles => {
      console.log('back from promise in edit deelte', bicycles);
      this.bicycles = bicycles;
      console.log('this bicycle', this.bicycles);
    });

    this._httpService.newbicycle.subscribe( bicycles => {
      console.log('in observable for new bikes', bicycles);
      this.bicycles = bicycles;
    });
  }

  updateBicycle(data) {
    console.log('clicked on update button', data.value);
    this._httpService.updateBicycle(data.value);

    this._httpService.newbicycle.subscribe( bicycles => {
      console.log('in observable for new bikes', bicycles);
      this.bicycles = bicycles;
    });
  }

  deleteBicycle(data) {
    console.log('clicked on delete button', data.value);
    this._httpService.deleteUserBicycle(data.value);

    // this._httpService.afterDeleteBicycle.subscribe( res => {console.log('in observable after delete bike'); this.bicycle=res.bicycle;})
    this._httpService.newbicycle.subscribe( bicycles => {
      console.log('in observable for new bikes', bicycles);
      this.bicycles = bicycles;
    });
  }
}
