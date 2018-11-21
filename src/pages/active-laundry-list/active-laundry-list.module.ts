import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveLaundryListPage } from './active-laundry-list';

@NgModule({
  declarations: [
    ActiveLaundryListPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiveLaundryListPage),
  ],
})
export class ActiveLaundryListPageModule {}
