import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationProvider } from '../../providers/authentication/authentication';
import { User } from '../../interfaces/user';
import { UserProvider } from '../../providers/user/user';
import { MessageProvider } from '../../providers/message/message';
import { InviteUserPage } from '../invite-user/invite-user';
import { InvitationsListPage } from '../invitations-list/invitations-list';
import { AboutPage } from '../about/about';
import { LoginPage } from '../login/login';
import { AuthenticationState } from '../../enums/authentication-state';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  user: User;
  enableNotifications = true; // TODO: Save this setting
  loggedIn = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authenticationProvider: AuthenticationProvider,
    private userProvider: UserProvider, private messageProvider: MessageProvider) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad SettingsPage');
    this.loggedIn = this.authenticationProvider.getAuthenticationState() == AuthenticationState.Authenticated;
    if(this.loggedIn) {
      this.userProvider.getMe().subscribe(res => {
        console.log(res);
        this.user = res;
      }, err => {
        this.messageProvider.showErrorMessage('Could not get account information.');
      });
    }
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  logout() {
    this.authenticationProvider.logout();
    this.messageProvider.showSuccessMessage('Logged out.');
    this.loggedIn = false;
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

  about() {
    this.navCtrl.push(AboutPage);
  }
}
