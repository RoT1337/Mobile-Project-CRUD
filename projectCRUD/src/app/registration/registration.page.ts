import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

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
      // Add your submission logic here
    } else {
      console.error('Passwords do not match.');
    }
  }
}
