import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LaundryProvider } from '../../providers/laundry/laundry';
import { EditLaundryTemplatePage } from '../edit-laundry-template/edit-laundry-template';
import { LaundryTemplate } from '../../interfaces/laundry-template';
import { MessageProvider } from '../../providers/message/message';

@IonicPage()
@Component({
  selector: 'page-laundry-template-list',
  templateUrl: 'laundry-template-list.html',
})
export class LaundryTemplateListPage {
  laundryTemplates: LaundryTemplate[] = [];

  constructor(public navCtrl: NavController, private messageProvider: MessageProvider, public navParams: NavParams, private laundryProvider: LaundryProvider) {
  }

  ionViewWillEnter() {
    this.load();
  }

  load(refresher?) {
    this.laundryProvider.getAllLaundryTemplates().subscribe(res => {
      this.laundryTemplates = res;
      if(refresher) {
        refresher.complete();
      }
    }, err => {
      this.messageProvider.showErrorMessage('Laundry templates could not be loaded.');
      if(refresher) {
        refresher.complete();
      }
    });
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