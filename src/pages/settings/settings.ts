import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { User } from '../../interfaces/user';
import { UserProvider } from '../../providers/user/user';
import { MessageProvider } from '../../providers/message/message';
import { InviteUserPage } from '../invite-user/invite-user';
import { InvitationsListPage } from '../invitations-list/invitations-list';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  user: User;
  enableNotifications = true; // TODO: Save this setting

  constructor(public navCtrl: NavController, public navParams: NavParams, private authenticationProvider: AuthenticationProvider,
    private userProvider: UserProvider, private messageProvider: MessageProvider) {
    userProvider.getMe().subscribe(res => {
      console.log(res);
      this.user = res;
    }, err => {
      messageProvider.showErrorMessage('Could not get account information.');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  logout() {
    this.authenticationProvider.logout();
  }

  invite() {
    this.navCtrl.push(InviteUserPage);
  }

  showInvitations() {
    this.navCtrl.push(InvitationsListPage, { user: this.user });
  }

  getNumberOfPendingInvitations() {
    if(this.user == null) {
      return 0;
    }

    return this.user.pendingActiveInvitations.length + this.user.pendingPassiveInvitations.length;
  }
}
