import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaundryProvider } from '../../providers/laundry/laundry';
import { ActiveLaundry } from '../../interfaces/active-laundry';

@IonicPage()
@Component({
  selector: 'page-active-laundry-list',
  templateUrl: 'active-laundry-list.html',
})
export class ActiveLaundryListPage {

  activeLaundries: ActiveLaundry[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private laundryProvider: LaundryProvider) {
    this.laundryProvider.getActiveLaundries().subscribe(res => {
      this.activeLaundries = res;
    }, err => {
      console.error(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActiveLaundryListPage');
  }

  add() {
    console.log('Add active laundry');
  }

}
