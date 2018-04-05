import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'Rxjs';

@Injectable()
export class HttpService {
  loggedIn: any
  newbicycle: BehaviorSubject<any[]> = new BehaviorSubject([]);
  afterDeleteBicycle: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private _http: HttpClient) {
    // this.postUser()
  }

  postUser(user) {
     console.log('in http service', user)
    let promise = new Promise((resolve,reject) => {
      this._http.post('api/user',user)
        .toPromise()
        .then(
          res => {console.log('from resolve',res.user.first_name);resolve(res);},
          msg => {reject(msg)}
        );
      })
      console.log('returning from promise')
      return promise;
  }

  getUser(user) {
    console.log('in http service', user);
    let promise = new Promise((resolve, reject) => {
      console.log('from promise', user)
      this._http.get('/api/user/'+user.email+'&'+user.password)
        .toPromise()
        .then(
          res => { console.log('from then of promise',res); resolve(res);},
          msg => {reject(msg)}
        );
    })
    console.log('returning from promise')
    return promise;
  }

  getUserContact(user_id) {
    console.log('getting user contact');
    let promise = new Promise((resolve, reject) => {
      this._http.get('/api/user/'+user_id)
        .toPromise()
        .then(
          res => { console.log("in promsie rsolve for contact", res);resolve(res);}
          msg => {reject(msg)}
    })
    return promise;
  }

  getSession() {
    let promise = new Promise((resolve, reject) => {
      this._http.get('/api/checkSession/')
        .toPromise()
        .then(
          res => { resolve(res); },
          msg => { reject(msg) }
        );
    })
    return promise;
  }

  postBicycle(bicycle) {
    let obs = this._http.post('/api/bicycle', bicycle);
    obs.subscribe((response) => {console.log('post user bike',bicycle.user_id); this.getNewBicycle(bicycle.user_id) })
  }

  updateBicycle(bicycle) {
    console.log('updateBicycle in http service', bicycle);
    let obs = this._http.post('/api/bicycle/update', bicycle);
    obs.subscribe((response) => {console.log('post user bike',bicycle); this.getNewBicycle(bicycle._user) })
  }

  deleteBicycle(data) {
    console.log('before db call to delete bicycle', data._id, data._user);
    let obs =this._http.post('/api/deleteBicycle', data);
    obs.subscribe((response) => {console.log('delete bicycle in http servcie', response); this.getBicycleAfterDelete()})
  }

  deleteUserBicycle(data) {
    console.log('before db call to delete bicycle', data._id, data._user);
    let obs =this._http.post('/api/deleteBicycle', data);
    obs.subscribe((response) => {console.log('delete bicycle in http servcie', response); this.getNewBicycle(response.data._user)})
  }

  getBicycleAfterDelete() {
    let obs = this._http.get('/api/bicycle/');
    obs.subscribe(( response => {console.log('in the getBicycleAfterDelete method'); this.afterDeleteBicycle.next(response)}))
  }

  getUserBicycle(user_id) {
    console.log('before promise get user bicycle')
    let promise = new Promise((resolve,reject) => {
      this._http.get('/api/bicycle/'+user_id)
        .toPromise()
        .then(
          res => { console.log('in resolve for user bicycle', res); resolve(res); },
          msg => { reject(msg) }
        );
    })
    return promise;
  }

  getNewBicycle(user_id) {
    console.log('in getNewBicycle in httpservie', user_id)
    let obs = this._http.get('/api/bicycle/'+user_id);
    obs.subscribe( (newbicycle => { console.log('getting new biccyle', newbicycle); this.newbicycle.next(newbicycle)})
  }

  getBicycles(user_id) {
    console.log('before promise get all bicycles')
    let promise = new Promise((resolve,reject) => {
      this._http.get('/api/bicycle/')
        .toPromise()
        .then(
          res => { console.log('in resolve for all bicycles', res); resolve(res); },
          msg => { reject(msg) }
        );
    })
    return promise;
  }

  logOff() {
    let promise = new Promise((resolve,reject) => {
      this._http.get('/api/clearSession/')
        .toPromise()
        .then(
          res => { resolve(res); },
          msg => { reject(msg) }
        );
    })
    return promise;
  }
}
