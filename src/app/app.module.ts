import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler, NavController } from 'ionic-angular';
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginPage } from '../pages/login/login';
import { AuthenticationInterceptor } from '../providers/authentication-interceptor/authentication-interceptor';
import { ActiveLaundryListPage } from '../pages/active-laundry-list/active-laundry-list';
import { LaundryTemplateListPage } from '../pages/laundry-template-list/laundry-template-list';
import { SettingsPage } from '../pages/settings/settings';
import { LaundryProvider } from '../providers/laundry/laundry';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    ActiveLaundryListPage,
    LaundryTemplateListPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    ActiveLaundryListPage,
    LaundryTemplateListPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationProvider,
    LaundryProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    LaundryProvider
  ]
})
export class AppModule {}
