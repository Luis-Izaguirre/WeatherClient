import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogginRequest } from './loggin-request';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LogginResult } from './loggin-result';
import { UntypedFormGroup } from '@angular/forms';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
public tokenKey : string = "tokenKey";

private _authStatus = new BehaviorSubject<boolean>(false);

public authStatus = this._authStatus.asObservable();

  init(): void {
    if(this.isAuthenticated()){
      this.setAuthStatus(true); 
    }
  }

  //We can't hard code, needs to be reactive
  //Three place to check, when application starts
  //when user logs in and logs out
  //login, logout sensitive to status authentication
  
  private setAuthStatus(isAuthenticated: boolean): void{
    this._authStatus.next(isAuthenticated);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }


  constructor(protected http:HttpClient) { }

  loggin(item : LogginRequest): Observable<LogginResult>{
    let url = `${environment.baseUrl}api/Admin/Loggin`;
    return this.http.post<LogginResult>(url, item)
    .pipe(tap(logginResult => {
      if (logginResult.success){
        localStorage.setItem(this.tokenKey,logginResult.token);
        this.setAuthStatus(true);
      }
    } ));
  }

  getToken(): string | null{
    return localStorage.getItem(this.tokenKey);
  }

  LogOut(): void {
    localStorage.removeItem(this.tokenKey);
    this.setAuthStatus(false);
  }
}
