import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'Rxjs';
import { Bicycle } from './bicycle';
import { User } from './user';

@Injectable()
export class HttpService {
  loggedIn: any;
  newbicycle: BehaviorSubject<Bicycle[]> = new BehaviorSubject([]);
  afterDeleteBicycle: BehaviorSubject<Bicycle[]> = new BehaviorSubject([]);

  constructor(private _http: HttpClient) {

  }

  postUser(user) {
    console.log('in http service', user);
    // const promise = new Promise((resolve, reject) => {
    //   this._http.post('api/user', user)
    //     .toPromise()
    //     .then(
    //       res => { 
    //         // console.log('from resolve', user.first_name); 
    //         resolve(res); 
    //       },
    //       msg => {reject(msg); }
    //     );
    //   });
    //   console.log('returning from promise');
    //   return promise;

      return this._http.post('/api/user/', user);
  }

  getUser(user) {
    console.log('in http service', user);
    // let promise = new Promise((resolve, reject) => {
    //   console.log('from promise', user);
    //   this._http.get('/api/user/'+user.email+'&'+user.password)
    //     .toPromise()
    //     .then(
    //       res => { console.log('from then of promise',res); resolve(res);},
    //       msg => {reject(msg)}
    //     );
    // })
    // console.log('returning from promise')
    // return promise;
    return this._http.get<User>('/api/user/' + user.email + '&' + user.password);
  }

  getUserContact(user_id) {
    console.log('getting user contact');
    // let promise = new Promise((resolve, reject) => {
    //   this._http.get('/api/user/'+user_id)
    //     .toPromise()
    //     .then(
    //       res => { console.log("in promsie rsolve for contact", res);resolve(res);},
    //       msg => {reject(msg)}
    //     )
    //   })
    // return promise;
    return this._http.get<User>('/api/user/' + user_id);
  }

  getSession() {
    const promise = new Promise((resolve, reject) => {
      this._http.get('/api/checkSession/')
        .toPromise()
        .then(
          res => { resolve(res); },
          msg => { reject(msg); }
        );
    });
    return promise;
  }

  postBicycle(bicycle) {
    const obs = this._http.post('/api/bicycle', bicycle);
    obs.subscribe((response) => {
      console.log('post user bike', bicycle.user_id);
      this.getNewBicycle(bicycle.user_id);
    });
  }

  updateBicycle(bicycle) {
    console.log('updateBicycle in http service', bicycle);
    const obs = this._http.post('/api/bicycle/update', bicycle);
    obs.subscribe((response) => {
      console.log('post user bike', bicycle);
      this.getNewBicycle(bicycle._user);
    });
  }

  deleteBicycle(data) {
    console.log('before db call to delete bicycle', data._id, data._user);
    const obs = this._http.post('/api/deleteBicycle', data);
    obs.subscribe((response) => {
      console.log('delete bicycle in http servcie', response);
      this.getBicycleAfterDelete();
    });
  }

  deleteUserBicycle(data) {
    console.log('before db call to delete bicycle', data._id, data._user);
    const obs = this._http.post('/api/deleteBicycle', data);
    obs.subscribe((response) => {
      console.log('delete bicycle in http servcie', response);
      this.getNewBicycle(response);
    });
  }

  getBicycleAfterDelete() {
    const obs = this._http.get<Bicycle[]>('/api/bicycle/');
    obs.subscribe( bicycles => {
      console.log('in the getBicycleAfterDelete method');
      this.afterDeleteBicycle.next(bicycles);
    });
  }

  getUserBicycles(user_id) {
    console.log('before promise get user bicycle');
    // let promise = new Promise((resolve,reject) => {
    //   this._http.get('/api/bicycle/'+user_id)
    //     .toPromise()
    //     .then(
    //       res => { console.log('in resolve for user bicycle', res); resolve(res); },
    //       msg => { reject(msg) }
    //     );
    // })
    // return promise;

    return this._http.get<Bicycle[]>('/api/bicycle/' + user_id);
  }

  getNewBicycle(user_id) {
    console.log('in getNewBicycle in httpservie', user_id);
    const obs = this._http.get<Bicycle[]>('/api/bicycle/' + user_id);
    obs.subscribe( bicycles => {
      console.log('getting new biccyle', bicycles);
      this.newbicycle.next(bicycles);
    });
  }

  getBicycles(user_id: number) {
    console.log('before promise get all bicycles');
    // let promise = new Promise((resolve,reject) => {
    //   this._http.get('/api/bicycle/')
    //     .toPromise()
    //     .then(
    //       res => { console.log('in resolve for all bicycles', res); resolve(res); },
    //       msg => { reject(msg) }
    //     );
    // })
    // return promise;

    return this._http.get<Bicycle[]>('/api/bicycle');
  }

  logOff() {
    let promise = new Promise((resolve,reject) => {
      this._http.get('/api/clearSession/')
        .toPromise()
        .then(
          res => { resolve(res); },
          msg => { reject(msg); }
        );
    })
    return promise;
  }
}
