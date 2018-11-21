import { HttpClient, HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationProvider } from '../authentication/authentication';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationProvider: AuthenticationProvider) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authenticationProvider.getToken();
    if(token) {
      req.headers.append('Authorization', 'Bearer ' + token);
    } 

    return next.handle(req);
  }
}
