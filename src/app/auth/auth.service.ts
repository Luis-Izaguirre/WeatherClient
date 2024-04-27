import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogginRequest } from './loggin-request';
import { Observable, tap } from 'rxjs';
import { LogginResult } from './loggin-result';
import { UntypedFormGroup } from '@angular/forms';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public tokenKey : string = "tokenKey";
  constructor(protected http:HttpClient) { }
  loggin(item : LogginRequest): Observable<LogginResult>{
    let url = `${environment.baseUrl}api/Admin/Loggin`;
    return this.http.post<LogginResult>(url, item)
    .pipe(tap(logginResult => {
      if (logginResult.success){
        localStorage.setItem(this.tokenKey,logginResult.token);
      }
    } ));
  }

  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }
}
