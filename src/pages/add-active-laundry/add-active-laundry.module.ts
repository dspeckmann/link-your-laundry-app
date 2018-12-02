import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddActiveLaundryPage } from './add-active-laundry';

@NgModule({
  declarations: [
    AddActiveLaundryPage,
  ],
  imports: [
    IonicPageModule.forChild(AddActiveLaundryPage),
  ],
})
export class AddActiveLaundryPageModule {}
