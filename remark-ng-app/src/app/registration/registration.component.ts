import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../authentication/authentication.component';
import {first} from 'rxjs/operators';
import {UserModel} from '../models/user';
import {ApiService} from '../shared/api.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  private username = '';
  private password = '';
  private passwordConfirm = '';
  public error = '';
  private firstChange = false;
  private secondChange = false;
  private check = false;
  constructor(private router: Router, private authService: AuthenticationService, private apiService: ApiService) { }

  ngOnInit() {
  }
  createUser() {
    const newUser: UserModel = {
      id: null,
      username: `${this.username}`,
      password: `${this.password}`
    };
    this.apiService.postUser(newUser).subscribe(
      res => {
        this.router.navigate(['/login']);
      },
      err => {
        alert('Error: createUser(username: string, password: string) function');
      }
    );
  }
  checkPasswordConfirm() {
    if (this.password !== this.passwordConfirm || this.password == null || this.password === '' || this.passwordConfirm == null || this.passwordConfirm === '') {
       return false;
    }
    return true;
  }

  checkChangeFirst() {
    this.firstChange = true;
  }

  checkChangeSecond() {
    this.secondChange = true;
  }
  public checkUser() {
    this.apiService.getUserIsExist(this.username).subscribe(
      res => {
        this.check = res;
      },
      err => {
      }
    );
  }
}
