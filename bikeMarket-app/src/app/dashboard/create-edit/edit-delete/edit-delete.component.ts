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
  bicycle = new Bicycle();
  // updateBicycle = new Bicycle();


  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getUserBicycles();
  }

  getUserBicycles() {
    console.log('edit delete bicycle', this.bicycle, this.myUserId)

    console.log('input user in edit-elete', this.myUserId)

    this._httpService.getUserBicycle(this.myUserId).then(res => {
      console.log('back from promise in edit deelte',res)
      this.bicycle = res.bicycle;
      console.log('this bicycle', this.bicycle)
    }

    this._httpService.newbicycle.subscribe( res => { console.log('in observable for new bikes', res); this.bicycle=res.bicycle})
  }

  updateBicycle(data) {
    console.log('clicked on update button', data.value)
    this._httpService.updateBicycle(data.value)

    this._httpService.newbicycle.subscribe( res => { console.log('in observable for new bikes', res); this.bicycle=res.bicycle})
  }

  deleteBicycle(data) {
    console.log('clicked on delete button', data.value)
    this._httpService.deleteUserBicycle(data.value);

    //this._httpService.afterDeleteBicycle.subscribe( res => {console.log('in observable after delete bike'); this.bicycle=res.bicycle;})
    this._httpService.newbicycle.subscribe( res => { console.log('in observable for new bikes', res); this.bicycle=res.bicycle})
  }

}
