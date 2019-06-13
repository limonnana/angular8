import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   // const token = localStorage.getItem('id_token');
   
   req.clone({
      setHeaders: {
        'authorization': `Bearer zaraza`
      },
      headers: req.headers.set('Authorization',  'hola'),
     body: req.params.set('tokenName', 'tokenToAdd')
     //req.params.set('')
    });
    console.log("Before making api call : ", JSON.stringify(req));
    return next.handle(req);
  }
}