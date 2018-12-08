import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../app/app.config';
import { ActiveLaundry } from '../../interfaces/active-laundry';
import { LaundryTemplate } from '../../interfaces/laundry-template';
import { CreateActiveLaundry } from '../../interfaces/create-active-laundry';

@Injectable()
export class LaundryProvider {

  constructor(private http: HttpClient) {
  }

  public getActiveLaundries() {
    return this.http.get<ActiveLaundry[]>(AppConfig.apiUrl + 'activelaundries');
  }

  // Returns all templates, own and group owned
  public getAllLaundryTemplates() {
    return this.http.get<LaundryTemplate[]>(AppConfig.apiUrl + 'laundrytemplates');
  }

  /**
   * This function adds a new active laundry based on a start time and a template.
   * @param viewModel The view model to create a new active laundry.
   */
  public addActiveLaundry(viewModel: CreateActiveLaundry) {
    console.log('HEY');
    return this.http.post<ActiveLaundry>(AppConfig.apiUrl + 'activelaundries', viewModel);
  }

  public addLaundryTemplate(laundryTemplate: LaundryTemplate) {
    return this.http.post<LaundryTemplate>(AppConfig.apiUrl + 'laundrytemplates', laundryTemplate);
  }

  public updateLaundryTemplate(laundryTemplate: LaundryTemplate) {
    return this.http.put<LaundryTemplate>(AppConfig.apiUrl + 'laundrytemplates/' + laundryTemplate.id, laundryTemplate);
  }
}
