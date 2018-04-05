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
    console.log('submitting user data', this.user)
     this._httpService.postUser(this.user).then(res => {
        console.log('back from promise', res.user)

         this.goDashboard(res.user);
     })
  }

  onlogin() {
    console.log('user object', this.user);

    this._httpService.getUser(this.user).then(res => {
      console.log('back from promise',res)
      this.user = res.user;
      console.log('this.user=res.user', this.user)

      console.log('loggin in ', this.first_name,this.last_name,res.sessionName)
      if (this.user.length!=0) {
        this.goDashboard(this.user[0])
      }
    ))
  }
  goDashboard(user) {
     console.log('we got this', user)
     this._router.navigate(['dashboard',user._id,user.first_name,user.last_name]);
  }
}
