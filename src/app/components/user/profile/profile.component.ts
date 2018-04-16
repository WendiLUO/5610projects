import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uid: string;
  name: string;
  email: string;
  password: string;
  breed: string;
  age: number;
  location: string;
  user = {};

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

 /* updateUser() {
    this.user = {
      name: this.name,
      email: this.email,
      password: this.password,
      breed: this.breed,
      age: this.age,
      location: this.location
    };
  }*/
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.uid = params['uid'];
    }
    );
    this.user = this.userService.findUserById(this.uid);
    this.name = this.user['name'];
    this.email = this.user['email'];
    this.password = this.user['password'];
    this.breed = this.user['breed'];
    this.age = this.user['age'];
    this.location = this.user['location'];
  }

}
