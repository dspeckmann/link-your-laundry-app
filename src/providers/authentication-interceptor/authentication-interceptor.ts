import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationProvider } from '../authentication/authentication';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationProvider: AuthenticationProvider) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepting HTTP request...');
    const token = this.authenticationProvider.getToken();
    if(token) {
      console.log('Appending token: ' + token);
      req = req.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    } 

    return next.handle(req);
  }
}
