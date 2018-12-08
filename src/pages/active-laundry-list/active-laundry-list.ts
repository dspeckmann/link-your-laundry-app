import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LaundryProvider } from '../../providers/laundry/laundry';
import { ActiveLaundry } from '../../interfaces/active-laundry';
import { AddActiveLaundryPage } from '../add-active-laundry/add-active-laundry';

@IonicPage()
@Component({
  selector: 'page-active-laundry-list',
  templateUrl: 'active-laundry-list.html',
})
export class ActiveLaundryListPage {

  activeLaundries: ActiveLaundry[] = [];

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private laundryProvider: LaundryProvider) {
  }

  load(refresher) {
    this.laundryProvider.getActiveLaundries().subscribe(res => {
      this.activeLaundries = res;
      refresher.complete();
    }, err => {
      this.alertCtrl.create({ title: 'Error', message: 'Active laundries could not be loaded.' }).present();
      refresher.complete();
    });
  }

  add() {
    this.navCtrl.push(AddActiveLaundryPage);
  }

  getStatus(laundry: ActiveLaundry) {
    const now = new Date();
    if(new Date(laundry.washStartTime).getTime() + new Date(laundry.laundryTemplate.washDuration).getTime() > now.getTime()) {
      return "Washing";
    }

    if(laundry.dryStartTime) {
      if(new Date(laundry.dryStartTime).getTime() + new Date(laundry.laundryTemplate.dryDuration).getTime() > now.getTime()) {
        return "Drying";
      }

      return "Finished";
    }

    return "Ready to dry";
  }
}
