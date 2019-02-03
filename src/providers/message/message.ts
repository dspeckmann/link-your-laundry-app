import { Injectable } from '@angular/core';
import { AlertController, ToastController } from 'ionic-angular';

@Injectable()
export class MessageProvider {

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) {
    console.log('Hello MessageProvider Provider');
  }

  public showSuccessMessage(message: string) {
    this.toastCtrl.create({ message }).present();
  }

  public showErrorMessage(message: string) {
    this.alertCtrl.create({ title: 'Error', message }).present();
  }
}
