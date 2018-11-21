import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaundryProvider } from '../../providers/laundry/laundry';

/**
 * Generated class for the LaundryTemplateListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-laundry-template-list',
  templateUrl: 'laundry-template-list.html',
})
export class LaundryTemplateListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private laundryProvider: LaundryProvider) {
    this.laundryProvider.getAllLaundryTemplates().subscribe(res => {
      console.log(res);
    }, err => {
      console.error(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaundryTemplateListPage');
  }

}
