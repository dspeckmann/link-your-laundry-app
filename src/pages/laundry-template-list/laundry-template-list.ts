import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { LaundryProvider } from '../../providers/laundry/laundry';
import { EditLaundryTemplatePage } from '../edit-laundry-template/edit-laundry-template';
import { LaundryTemplate } from '../../interfaces/laundry-template';

@IonicPage()
@Component({
  selector: 'page-laundry-template-list',
  templateUrl: 'laundry-template-list.html',
})
export class LaundryTemplateListPage {
  laundryTemplates: LaundryTemplate[] = [];

  constructor(public navCtrl: NavController, alertCtrl: AlertController, public navParams: NavParams, private laundryProvider: LaundryProvider) {
    this.laundryProvider.getAllLaundryTemplates().subscribe(res => {
      this.laundryTemplates = res;
    }, err => {
      alertCtrl.create({ title: 'Error', message: 'Laundry templates could not be loaded.' }).present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LaundryTemplateListPage');
  }

  add() {
    this.navCtrl.push(EditLaundryTemplatePage, {
      laundryTemplate: { name: '', detergent: '', washCycle: '', washDuration: '01:00', dryCycle: '', dryDuration: '01:00' }
    });
  }

  edit(laundryTemplate: LaundryTemplate) {
    this.navCtrl.push(EditLaundryTemplatePage, { laundryTemplate });
  }
}