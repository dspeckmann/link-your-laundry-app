import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaundryProvider } from '../../providers/laundry/laundry';

/**
 * Generated class for the ActiveLaundryListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-active-laundry-list',
  templateUrl: 'active-laundry-list.html',
})
export class ActiveLaundryListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private laundryProvider: LaundryProvider) {
    this.laundryProvider.getActiveLaundries().subscribe(res => {
      console.log(res);
    }, err => {
      console.error(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActiveLaundryListPage');
  }

}
