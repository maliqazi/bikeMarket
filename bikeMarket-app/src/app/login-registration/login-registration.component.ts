import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.css']
})
export class LoginRegistrationComponent implements OnInit {
  user = new User();

  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router) { }

  ngOnInit() {
  }

  submitUser() {
    console.log('submitting user data', this.user);
     this._httpService.postUser(this.user).subscribe(user => {
        console.log('back from promise', user);

         this.goDashboard(user);
     });
  }

  onlogin() {
    console.log('user object', this.user);

    this._httpService.getUser(this.user).subscribe(response => {
      console.log('back from promise', response);
      // for (const key of Object.keys(response)) {
      //   console.log(response[key]);
      // }
      this.user = response['user'];
      console.log('this.user=res.user', this.user);

      console.log('loggin in ', this.user.first_name, this.user.last_name);
      if (this.user) {
        this.goDashboard(this.user);
      }
    });
  }
  goDashboard(user) {
     console.log('we got this', user);
     this._router.navigate(['dashboard', user._id, user.first_name, user.last_name]);
  }
}
