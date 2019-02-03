import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { LaundryTemplate } from '../../interfaces/laundry-template';
import { LaundryProvider } from '../../providers/laundry/laundry';
import { Observable } from 'rxjs';
import { MessageProvider } from '../../providers/message/message';

/**
 * Generated class for the EditLaundryTemplatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-laundry-template',
  templateUrl: 'edit-laundry-template.html',
})
export class EditLaundryTemplatePage {

  laundryTemplate: LaundryTemplate;

  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, private laundryProvider: LaundryProvider,
    private messageProvider: MessageProvider) {
    this.laundryTemplate = navParams.get('laundryTemplate');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditLaundryTemplatePage');
  }

  save() {
    let observable: Observable<LaundryTemplate>;
    if(this.laundryTemplate.id) {
      observable = this.laundryProvider.updateLaundryTemplate(this.laundryTemplate);
    } else {
      observable = this.laundryProvider.addLaundryTemplate(this.laundryTemplate);
    }

    observable.subscribe(res => {
      this.messageProvider.showSuccessMessage('Successfully updated laundry template.');
      this.navCtrl.pop();
    }, err => {
      this.messageProvider.showErrorMessage('Laundry template could not be saved.');
    });
  }

}
