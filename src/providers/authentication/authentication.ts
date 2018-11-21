import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { AppConfig } from '../../app/app.config';
import { LoginResponse } from '../../interfaces/login-response';
import { Storage } from '@ionic/storage';

@Injectable()
export class AuthenticationProvider {

  private token: string;
  private authenticationSubject: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private storage: Storage) {
  }

  public getToken() {
    return this.token;
  }

  public checkAuthentication(): Observable<boolean> {
    if(this.token) {
      this.authenticationSubject.next(true);
    } else {
      const t = this.storage.get('token').then(
        t => {
          if(t) {
            this.token = t;
            this.authenticationSubject.next(true);
          } else {
            this.authenticationSubject.next(false);
          }
        }, err => {
          this.authenticationSubject.next(false);
        }
      );
    }

    return this.authenticationSubject;
  }

  public login(email: string, password: string) {
    this.http.post<LoginResponse>(AppConfig.apiUrl + 'authentication', { username: email, password }).subscribe(res => {
      this.token = res.token;
      this.storage.set('token', this.token);
      this.authenticationSubject.next(true);
    }, err => {
      console.error('Error during login!');
    });
  }
}
