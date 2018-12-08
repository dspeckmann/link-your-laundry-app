import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ActiveLaundry } from '../../interfaces/active-laundry';
import { LaundryTemplate } from '../../interfaces/laundry-template';
import { LaundryProvider } from '../../providers/laundry/laundry';
import { CreateActiveLaundry } from '../../interfaces/create-active-laundry';

/**
 * Generated class for the AddActiveLaundryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-active-laundry',
  templateUrl: 'add-active-laundry.html',
})
export class AddActiveLaundryPage {

  availableTemplates: LaundryTemplate[] = [];

  public viewModel: CreateActiveLaundry = {
    laundryTemplateId: null,
    washStartTime: new Date()
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController, private laundryProvider: LaundryProvider) {
    this.laundryProvider.getAllLaundryTemplates().subscribe(res => {
      this.availableTemplates = res;
    }, err => {
      console.error(err);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddActiveLaundryPage');
  }

  save() {
    this.laundryProvider.addActiveLaundry(this.viewModel).subscribe(res => {
      this.navCtrl.pop();
    }, err => {
      this.alertCtrl.create({ title: 'Error', message: 'Laundry could not be started.' }).present();
    });
  }
}