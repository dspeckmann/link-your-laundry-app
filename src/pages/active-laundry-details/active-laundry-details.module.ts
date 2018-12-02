import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActiveLaundryDetailsPage } from './active-laundry-details';

@NgModule({
  declarations: [
    ActiveLaundryDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ActiveLaundryDetailsPage),
  ],
})
export class ActiveLaundryDetailsPageModule {}
