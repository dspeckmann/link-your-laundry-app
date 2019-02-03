import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user';
import { AppConfig } from '../../app/app.config';
import { Invitation } from '../../interfaces/invitation';

@Injectable()
export class UserProvider {

  constructor(public http: HttpClient) {
    console.log('Hello UserProvider Provider');
  }

  public getMe() {
    return this.http.get<User>(AppConfig.apiUrl + 'users/me');
  }

  public invite(email: string) {
    return this.http.post<Invitation>(AppConfig.apiUrl + 'invitations', { email });
  }
}
