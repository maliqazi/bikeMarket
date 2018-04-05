import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  first_name: any
  last_name: any
  user_id: any

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
      this._route.paramMap.subscribe( params => {
        this._httpService.getSession()
          .then( res => {
              this.user_id = params.params._id;
              this.first_name = params.params.first_name.charAt(0).toUpperCase() + params.params.first_name.slice(1);
              this.last_name = params.params.last_name.charAt(0).toUpperCase() + params.params.last_name.slice(1);
              if (!res.sessionName)
              {
                console.log("No open session available")
                this._router.navigate(['login']);
              }
            });
      })
    }

  ngOnInit() {
  }

  logoff() {
    this._httpService.logOff()
    this._router.navigate(['login']);
  }
}
