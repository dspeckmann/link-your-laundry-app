import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../app/app.config';
import { ActiveLaundry } from '../../interfaces/active-laundry';
import { LaundryTemplate } from '../../interfaces/laundry-template';

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

  public addLaundryTemplate(laundryTemplate: LaundryTemplate) {
    return this.http.post<LaundryTemplate>(AppConfig.apiUrl + 'laundrytemplates', laundryTemplate);
  }

  public updateLaundryTemplate(laundryTemplate: LaundryTemplate) {
    return this.http.put<LaundryTemplate>(AppConfig.apiUrl + 'laundrytemplates/' + laundryTemplate.id, laundryTemplate);
  }
}
