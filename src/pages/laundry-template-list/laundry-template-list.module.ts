import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LaundryTemplateListPage } from './laundry-template-list';

@NgModule({
  declarations: [
    LaundryTemplateListPage,
  ],
  imports: [
    IonicPageModule.forChild(LaundryTemplateListPage),
  ],
})
export class LaundryTemplateListPageModule {}
