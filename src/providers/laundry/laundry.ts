import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../app/app.config';

@Injectable()
export class LaundryProvider {

  constructor(private http: HttpClient) {
  }

  public getActiveLaundries() {
    return this.http.get<any>(AppConfig.apiUrl + 'activelaundries')
  }

  // Returns all templates, own and group owned
  public getAllLaundryTemplates() {
    return this.http.get<any>(AppConfig.apiUrl + 'laundrytemplates')
  }

}
