import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
  moduleId: module.id
})
export class LoginComponent implements OnInit {
  @ViewChild('f') loginForm: NgForm;
  username: String;
  password: String;
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  login( ) {
    if (this.username === null && this.password === null) {
      this.errorFlag = true;
    }
    // fetching data from loginForm
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    this.userService.login(this.username, this.password)
      .subscribe(
        (user: any) => {
          this.errorFlag = false;
          this.router.navigate(['/user', user._id]); },
        (error: any) => {
          this.errorFlag = true;
          console.log(error);
        }
      );
  }

}
