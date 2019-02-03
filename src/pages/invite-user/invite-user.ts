import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { MessageProvider } from '../../providers/message/message';

/**
 * Generated class for the InviteUserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-invite-user',
  templateUrl: 'invite-user.html',
})
export class InviteUserPage {
  public email = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider, private messageProvider: MessageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InviteUserPage');
  }

  invite() {
    this.userProvider.invite(this.email).subscribe(res => {
      console.log(res);
      this.messageProvider.showSuccessMessage('Successfully invited ' + this.email + '.');
      this.navCtrl.pop();
    }, err => {
      this.messageProvider.showErrorMessage('Could not invite ' + this.email + '.');
    });
  }
}
