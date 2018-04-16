import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import 'rxjs/Rx';

@Injectable()
export class UserService {
  constructor(private _http: HttpClient){}
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
    user._id = '789';
    this.users.push(user);
    return user;
  }
  findUserById(userId: string) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        return this.users[x];
      }
    }
  }
  updateUser(userId, user) {
    for (let x = 0; x < this.users.length; x++) {
      if (this.users[x]._id === userId) {
        return this.users[x];
      }
    }
  }
}

