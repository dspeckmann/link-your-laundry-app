import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LaundryProvider } from '../../providers/laundry/laundry';
import { ActiveLaundry } from '../../interfaces/active-laundry';
import { AddActiveLaundryPage } from '../add-active-laundry/add-active-laundry';
import * as moment from 'moment';
import { LaundryStatus } from '../../interfaces/laundry-status';
import { ActiveLaundryDetailsPage } from '../active-laundry-details/active-laundry-details';

@IonicPage()
@Component({
  selector: 'page-active-laundry-list',
  templateUrl: 'active-laundry-list.html',
})
export class ActiveLaundryListPage {
  LaundryStatus = LaundryStatus;
  activeLaundries: ActiveLaundry[] = [];

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, private laundryProvider: LaundryProvider) {
    this.updateLaundryStatus();
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
      this.alertCtrl.create({ title: 'Error', message: 'Active laundries could not be loaded.' }).present();
      if(refresher) {
        refresher.complete();
      }
    });
  }

  edit(laundry: ActiveLaundry) {
    this.navCtrl.push(ActiveLaundryDetailsPage, { laundry });
  }

  add() {
    this.navCtrl.push(AddActiveLaundryPage);
  }

  updateLaundryStatus() {
    // Not working properly
    this.activeLaundries.forEach(laundry => {
      let start: moment.Moment;
      let end: moment.Moment;
      if(laundry.dryStartTime) {
        start = moment(laundry.dryStartTime);
        end = start.add(moment.duration(laundry.laundryTemplate.dryDuration));
        if(end > moment()) {
          laundry.status = LaundryStatus.Drying;
        } else {
          laundry.status = LaundryStatus.Finished;
        }
      } else {
        start = moment(laundry.washStartTime);
        end = start.add(moment.duration(laundry.laundryTemplate.washDuration));
        if(end > moment()) {
          laundry.status = LaundryStatus.Washing;
        } else {
          laundry.status = LaundryStatus.ReadyToDry;
        }
      }

      const left = end.diff(moment());
      laundry.timeLeft = moment(left).toDate();
    });
    setTimeout(() => this.updateLaundryStatus(), 1000);
  }
}
