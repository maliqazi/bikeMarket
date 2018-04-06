import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  first_name: string;
  last_name: string;
  user_id: string;

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
      this._route.paramMap.subscribe( params => {
        this._httpService.getSession()
          .then( sessionName => {
              this.user_id = params.get('_id');
              const fname = params.get('first_name');
              this.first_name = fname.charAt(0).toUpperCase() + fname.slice(1);
              const lname = params.get('last_name');
              this.last_name = lname.charAt(0).toUpperCase() + lname.slice(1);
              if (!sessionName) {
                console.log('No open session available');
                this._router.navigate(['login']);
              }
            });
      });
    }

  ngOnInit() {
  }

  logoff() {
    this._httpService.logOff()
    this._router.navigate(['login']);
  }
}
