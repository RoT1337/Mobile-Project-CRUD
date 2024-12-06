import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  password: string = '';
  confirmPassword: string = '';
  passwordsMatch: boolean = true;

  checkPasswordMatch() {
    this.passwordsMatch = this.password === this.confirmPassword;
  }

  onSubmit(event: Event) {
    event.preventDefault();

    if (this.passwordsMatch) {
      console.log('Form submitted successfully!');
    } else {
      console.error('Passwords do not match.');
    }
  }
}
