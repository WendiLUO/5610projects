import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {ActivatedRoute} from '@angular/router';
import { Router} from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  uid: string;
  username: string;
  email: string;
  password: string;
  breed: string;
  age: number;
  location: string;
  gender: string;
  user = {};

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private router: Router) { }

  updateUser() {
    this.user = {
      username: this.username,
      email: this.email,
      breed: this.breed,
      age: this.age,
      _id: this.uid,
      gender: this.gender,
      location: this.location
    };
    this.userService.updateUser(this.uid, this.user)
      .subscribe((updateUser) => {
        this.user = updateUser;
        console.log(this.user);
        this.router.navigate(['/user/' + this.uid + '/post']);
      });
  }
  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }
  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.uid = params['uid'];
      this.userService.findUserById(this.uid)
        .subscribe((user: any) => {
          this.user = user;
          console.log(user);
          this.email = this.user['email'];
          this.username = this.user['username'];
          this.breed = this.user['breed'];
          this.age = this.user['age'];
          this.location = this.user['location'];
          this.gender = this.user['gender'];
        });
    }
    );
  }

}
