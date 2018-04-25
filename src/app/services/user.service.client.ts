import { Injectable } from '@angular/core';
import { Http , RequestOptions, Response} from '@angular/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class UserService {
  baseUrl = environment.baseUrl;
  options = new RequestOptions();
  constructor(private _http: Http) {}
  users = [
    {_id: '123', name: 'Emma', email: 'emma@gmail.com', password: '123', breed: 'samyoed', age: '2', location: 'sunnyvale'},
    {_id: '456', name: 'Noodle', email: 'noodle@gmail.com', password: '123', breed: 'poodle', age: '1', location: 'sunnyvale'}
  ];
  api = {
    'createUser': this.createUser,
    'findUserById': this.findUserById,
    'updateUser': this.updateUser
  };

  createUser(user: any) {
    /* user._id = '456';
     this.users.push(user);
     return user;*/
    const url = 'http://localhost:3000/api/user/';
    return this._http.post(url, user).map(response => response.json());
  }

  findUserById(userId: string) {
    const url = 'http://localhost:3000/api/user/' + userId;
    return this._http.get(url).map(response => response.json());
  }

  findUserByCredentials(username, password) {
    // for (let x = 0; x < this.users.length; x++) {
    // if (this.users[x].username === username && this.users[x].password === password){
    //        return this.users[x];
    //    }
    // this._http.get('some_url' + ).
    const url = 'http://localhost:3000/api/user?username=' + username + '&password=' + password;
    return this._http.get(url)
      .map(response => response.json());

  }
  updateUser(userId, user) {
    /*for (let x = 0; x < this.users.length; x++) {
        if (this.users[x]._id === userId) {
            this.users[x] = user;
        }
    }*/
    const url = 'http://localhost:3000/api/user/' + userId;
    return this._http.put(url, user)
      .map(response => response.json());
  }

  login(username, password) {
    // this.options.withCredentials = true;
    const body = {
      username: username,
      password: password
    };
    console.log(body);
    console.log('user ts file');
    return this._http.post(this.baseUrl + '/api/login', body)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

  logout() {
    this.options.withCredentials = true;
    return this._http.post(this.baseUrl + '/api/logout', '')
      .map(
        (res: Response) => {
          const data = res;
        }
      );
  }

  register(username: String, password: String) {
    this.options.withCredentials = true;
    const user = {
      username: username,
      password: password,
    };

    return this._http.post(this.baseUrl + '/api/register', user)
      .map(
        (res: Response) => {
          const data = res.json();
          return data;
        }
      );
  }

}


