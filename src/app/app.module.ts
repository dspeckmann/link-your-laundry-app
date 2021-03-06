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
import { ActiveLaundryDetailsPage } from '../pages/active-laundry-details/active-laundry-details';
import { AddActiveLaundryPage } from '../pages/add-active-laundry/add-active-laundry';
import { EditLaundryTemplatePage } from '../pages/edit-laundry-template/edit-laundry-template';
import { MessageProvider } from '../providers/message/message';
import { UserProvider } from '../providers/user/user';
import { InviteUserPage } from '../pages/invite-user/invite-user';
import { InvitationsListPage } from '../pages/invitations-list/invitations-list';
import { AboutPage } from '../pages/about/about';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    LoginPage,
    ActiveLaundryListPage,
    AddActiveLaundryPage,
    ActiveLaundryDetailsPage,
    LaundryTemplateListPage,
    EditLaundryTemplatePage,
    SettingsPage,
    InviteUserPage,
    InvitationsListPage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    LoginPage,
    ActiveLaundryListPage,
    AddActiveLaundryPage,
    ActiveLaundryDetailsPage,
    LaundryTemplateListPage,
    EditLaundryTemplatePage,
    SettingsPage,
    InviteUserPage,
    InvitationsListPage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthenticationProvider,
    LaundryProvider,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true },
    MessageProvider,
    UserProvider
  ]
})
export class AppModule {}
