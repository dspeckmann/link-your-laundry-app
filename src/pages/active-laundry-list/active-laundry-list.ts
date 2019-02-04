import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LaundryProvider } from '../../providers/laundry/laundry';
import { ActiveLaundry } from '../../interfaces/active-laundry';
import { AddActiveLaundryPage } from '../add-active-laundry/add-active-laundry';
import { LaundryStatus } from '../../interfaces/laundry-status';
import { ActiveLaundryDetailsPage } from '../active-laundry-details/active-laundry-details';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { MessageProvider } from '../../providers/message/message';

@IonicPage()
@Component({
  selector: 'page-active-laundry-list',
  templateUrl: 'active-laundry-list.html',
})
export class ActiveLaundryListPage {
  LaundryStatus = LaundryStatus;
  activeLaundries: ActiveLaundry[] = [];

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private laundryProvider: LaundryProvider,
    private authenticationProvider: AuthenticationProvider, private messageProvider: MessageProvider) {
  }

  ionViewWillEnter() {
    this.load();
  }

  load(refresher?) {
    this.laundryProvider.getActiveLaundries().subscribe(res => {
      this.activeLaundries = res;
      if(refresher) {
        refresher.complete();
      }
    }, err => {
      this.messageProvider.showErrorMessage('Active laundries could not be loaded.');
      if(refresher) {
        refresher.complete();
      }
    });
  }

  edit(laundry: ActiveLaundry) {
    console.log(laundry);
    this.navCtrl.push(ActiveLaundryDetailsPage, { activeLaundry: laundry });
  }

  add() {
    this.navCtrl.push(AddActiveLaundryPage);
  }
}
