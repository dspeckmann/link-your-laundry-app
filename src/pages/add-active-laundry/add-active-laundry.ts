import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { ActiveLaundry } from '../../interfaces/active-laundry';
import { LaundryTemplate } from '../../interfaces/laundry-template';
import { LaundryProvider } from '../../providers/laundry/laundry';
import { CreateActiveLaundry } from '../../interfaces/create-active-laundry';
import { MessageProvider } from '../../providers/message/message';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private laundryProvider: LaundryProvider, private messageProvider: MessageProvider) {
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
      this.messageProvider.showSuccessMessage('Successfully started laundry.');
      this.navCtrl.pop();
    }, err => {
      this.messageProvider.showErrorMessage('Laundry could not be started.');
    });
  }
}