import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.component';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  model: FeedbackViewModel = {
    name: '',
    email: '',
    feedback: ''
  };
  username = this.auth.currentUserValue.username;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
  }

  ngOnInit() {

  }
  sendFeedback(): void {
    const url = 'http://localhost:8083/api/feedback';
    this.http.post(url, this.model).subscribe(
      res => {
        location.reload();
      },
      err => {
        alert('An error has occurred while sending feedback');
      }
    );
  }
}
export interface FeedbackViewModel {
 name: string;
 email: string;
 feedback: string;
}
