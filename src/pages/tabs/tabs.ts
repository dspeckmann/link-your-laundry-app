import { Component } from '@angular/core';

import { ActiveLaundryListPage } from '../active-laundry-list/active-laundry-list';
import { LaundryTemplateListPage } from '../laundry-template-list/laundry-template-list';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  activeLaundryTab = ActiveLaundryListPage;
  laundryTemplateTab = LaundryTemplateListPage;
  settingsTab = SettingsPage;

  constructor() {

  }
}
