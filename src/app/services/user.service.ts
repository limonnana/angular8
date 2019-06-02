import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entities/user';
import { environment } from '../../environments/environment';                          
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  error: string | undefined;

  constructor(private http: HttpClient) {}

  user: User[];

  public getUsers(): Observable<User[]> {
    this.http
      .get<User>(`${environment.secureUserApi}/findAll`)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
      .subscribe(
        theCredentials => {
      },
        error => {
          console.log(`Login error: ${error}`);
          this.error = error;
        }
      );
    return this.http.get<User[]>(`${environment.secureUserApi}/findAll`);
  }

  public save(user: User) {
    console.log(JSON.stringify(user));
    return this.http.post<User>(`${environment.secureUserApi}/create`, user);
  }

  handleError(error: { error: { message: string }; status: any; message: any }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
