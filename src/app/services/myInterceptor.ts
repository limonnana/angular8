import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from 'rxjs';
import { CredentialsService } from './credentials.service';

@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private credentialsService: CredentialsService) { }
  
  currentUserCredentials = this.credentialsService.credentials;
  credentialJson = JSON.stringify(this.currentUserCredentials);
 // console.log('the Credentials: ' + this.credentialJson);
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //how to update the request Parameters
   
    const updatedRequest = request.clone({
       
     // headers: request.headers.set("authorization",  "zaraza")
    // setHeaders: {
     //   Authorization: `Bearer zaraza`
     // }

     headers: request.headers.set(`Authorization`, this.credentialJson)
        
    });
    //logging the updated Parameters to browser's console
    console.log("Before making api call : ", JSON.stringify(updatedRequest));
   
    return next.handle(updatedRequest).pipe(
      tap(
        event => {
          //logging the http response to browser's console in case of a success
          if (event instanceof HttpResponse) {
            console.log("api call success :", event);
          }
        },
        error => {
          //logging the http response to browser's console in case of a failuer
          if (event instanceof HttpResponse) {
            console.log("api call error :", event);
          }
        }
      )
    );
  }
}