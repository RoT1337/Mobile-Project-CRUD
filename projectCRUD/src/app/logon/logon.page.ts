import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-logon',
  templateUrl: './logon.page.html',
  styleUrls: ['./logon.page.scss'],
})
export class LogonPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  onNextClick() {
    this.navCtrl.navigateForward('/login');
  }
}
