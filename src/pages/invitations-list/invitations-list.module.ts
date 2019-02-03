import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InvitationsListPage } from './invitations-list';

@NgModule({
  declarations: [
    InvitationsListPage,
  ],
  imports: [
    IonicPageModule.forChild(InvitationsListPage),
  ],
})
export class InvitationsListPageModule {}
