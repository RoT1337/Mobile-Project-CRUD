import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  password: string = '';
  confirmPassword: string = ''; 
  passwordsMatch: boolean = true;
  policyChecked: boolean = false;

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

  onRegisterClick() {
    this.navCtrl.navigateForward('/home');
  }
}
