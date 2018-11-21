import { Component, ViewChild } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { LoginPage } from '../pages/login/login';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('rootNav') nav: NavController;
  rootPage: any = TabsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, authenticationProvider: AuthenticationProvider) {
    platform.ready().then(() => {
      authenticationProvider.checkAuthentication().subscribe(
        authenticated => {
          statusBar.styleDefault();
          splashScreen.hide();
          if(authenticated) {
            this.rootPage = TabsPage;
          } else {
            this.rootPage = LoginPage;
          }
        }
      );
    });
  }
}
