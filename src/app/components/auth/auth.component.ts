import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  signIn = true;
  signUp = false;

  constructor() { }

  ngOnInit() {
  }

  showSignUpForm() {
    this.signUp = true;
    this.signIn = false;
  }

  showSignInForm() {
    this.signIn = true;
    this.signUp = false;
  }

}
