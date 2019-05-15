import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationProvider } from '../authentication/authentication';
import { from } from 'rxjs/observable/from';
import { switchMap } from 'rxjs/operators';
import { AuthenticationState } from '../../enums/authentication-state';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationProvider: AuthenticationProvider) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Authentication Interceptor');
    if(this.authenticationProvider.getAuthenticationState() == AuthenticationState.Authenticated) {
      console.log('Intercepting HTTP request...');
      return from(this.authenticationProvider.getAccessToken()).pipe(
        switchMap(accessToken => {
          console.log('Appending token: ' + accessToken);
          req = req.clone({
            setHeaders: {
                Authorization: 'Bearer ' + accessToken
            }
          });
      
          return next.handle(req);
        })
      );
    }
    
    // If not authenticated or refreshing we do not intercept
    console.log('User is not authenticated, not intercepting request.');
    return next.handle(req);
  }
}
