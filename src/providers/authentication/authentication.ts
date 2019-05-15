import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfig } from '../../app/app.config';
import { LoginResponse } from '../../interfaces/login-response';
import { Storage } from '@ionic/storage';
import { AuthenticationState } from '../../enums/authentication-state';

@Injectable()
export class AuthenticationProvider {

  private accessToken: string;
  private expires: Date;
  private refreshToken: string;
  private state: AuthenticationState;

  constructor(private http: HttpClient, private storage: Storage) {
  }

  // TODO: Refresh if header "WWW-Authenticate" contains "invalid_token"?

  public async loadTokenFromStorage(): Promise<boolean> {
    console.log('Getting token from storage...');
    const t = await this.storage.get('token');
    if(t) {
      this.accessToken = t.accessToken;
      this.expires = t.expires;
      this.refreshToken = t.refreshToken;
      console.log('Got token from storage.');
      this.state = AuthenticationState.Authenticated;
      return true;
    }

    console.log('No token found in storage.');
    this.state = AuthenticationState.NotAuthenticated;
    return false;
  }

  public getAuthenticationState(): AuthenticationState {
    return this.state;
  }

  public async getAccessToken(): Promise<string> {
    if(this.accessToken) {
      if(this.expires < new Date()) {
        console.log('Refreshing token...');
        this.state = AuthenticationState.Refreshing;
        await this.refresh();
        this.state = AuthenticationState.Authenticated;
        console.log('Token refreshed.');
      }

      return this.accessToken;
    }

    throw new Error('Not authenticated');
  }

  // TODO: Check if password is wrong or general error
  public async login(email: string, password: string) {
    try {
      const res = await this.http.post<LoginResponse>(AppConfig.apiUrl + 'authentication', { email, password }).toPromise();
      this.accessToken = res.accessToken;
      this.expires = new Date(new Date().getTime() + res.expiresIn * 1000);
      this.refreshToken = res.refreshToken;
      this.storage.set('token', {
        accessToken: this.accessToken,
        expires: this.expires,
        refreshToken: this.refreshToken
      });
      this.state = AuthenticationState.Authenticated;
      console.log('Logged in successfully.');
    } catch(err) {
      console.error('Error during login!');
      throw new Error()
    }
  }

  private async refresh() {
    if(this.refreshToken) {
      try {
        const res = await this.http.put<LoginResponse>(AppConfig.apiUrl + 'authentication', { token: this.accessToken }).toPromise();
        this.accessToken = res.accessToken;
        this.expires = new Date(new Date().getTime() + res.expiresIn * 1000);
        this.refreshToken = res.refreshToken;
        this.storage.set('token', {
          accessToken: this.accessToken,
          expires: this.expires,
          refreshToken: this.refreshToken
        });
      } catch(err) {
        console.error('Error during refresh!');
        throw new Error('Error during refresh!');
      }
    } else {
      console.error('No refresh token found!');
      throw new Error('No refresh token found!');
    }
  }

  public logout() {
    this.accessToken = null;
    this.expires = null;
    this.refreshToken = null;
    this.storage.remove('token');
    this.state = AuthenticationState.NotAuthenticated;
    console.log('Logged out.');
  }
}
