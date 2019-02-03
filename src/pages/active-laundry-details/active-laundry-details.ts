import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ActiveLaundry } from '../../interfaces/active-laundry';
import { LaundryStatus } from '../../interfaces/laundry-status';
import { LaundryProvider } from '../../providers/laundry/laundry';
import { MessageProvider } from '../../providers/message/message';

/**
 * Generated class for the ActiveLaundryDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-active-laundry-details',
  templateUrl: 'active-laundry-details.html',
})
export class ActiveLaundryDetailsPage {
  LaundryStatus = LaundryStatus;
  activeLaundry: ActiveLaundry;

  constructor(public navCtrl: NavController, public navParams: NavParams, private laundryProvider: LaundryProvider, private messageProvider: MessageProvider) {
    this.activeLaundry = navParams.get('activeLaundry');
    console.log(this.activeLaundry);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActiveLaundryDetailsPage');
  }

  startDrying() {
    this.activeLaundry.dryStartTime = new Date();
    this.activeLaundry.status = LaundryStatus.Drying;
    this.laundryProvider.updateActiveLaundry(this.activeLaundry).subscribe(res => {
      this.messageProvider.showSuccessMessage('Successfully start drying.');
      this.activeLaundry = res;
    }, err => {
      this.messageProvider.showErrorMessage('Drying could not be started.');
    });
  }

  takeOut() {
    this.activeLaundry.completed = true;
    this.laundryProvider.updateActiveLaundry(this.activeLaundry).subscribe(res => {
      this.messageProvider.showSuccessMessage('Successfully finished laundry.');
      this.activeLaundry = res;
    }, err => {
      this.messageProvider.showErrorMessage('Laundry could not be finished.');
    });
  }

}
