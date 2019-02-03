import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  enableNotifications = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authenticationProvider: AuthenticationProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  logout() {
    this.authenticationProvider.logout();
  }
}
