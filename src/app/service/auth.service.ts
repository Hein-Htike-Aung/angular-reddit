import {
  SignUpRequestPayload,
  LoginRequestPayload,
  LoginResponse,
} from './../model/app.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

const APIURL = `${environment.apiUrl}/auth`;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  @Output() loggedInOutput: EventEmitter<boolean> = new EventEmitter();
  @Output() usernameOutput: EventEmitter<string> = new EventEmitter();

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  refreshTokenRequestPayload = {
    refreshToken: this.getRefreshToken,
    username: this.getUsername,
  };

  signUp(signUpRequestPayload: SignUpRequestPayload): Observable<string> {
    return this.http.post(`${APIURL}/signup`, signUpRequestPayload, {
      responseType: 'text',
    });
  }

  login(loginRequestPayload: LoginRequestPayload): Observable<boolean> {
    return this.http
      .post<LoginResponse>(`${APIURL}/login`, loginRequestPayload)
      .pipe(
        map((resp) => {
          this.localStorage.store(
            'authenticationToken',
            resp.authenticationToken
          );
          this.localStorage.store('expiresAt', resp.expiresAt);
          this.localStorage.store('refreshToken', resp.refreshToken);
          this.localStorage.store('username', resp.username);

          // Fire
          this.usernameOutput.emit(resp.username);
          this.loggedInOutput.emit(true);

          return true;
        })
      );
  }

  logOut() {
    this.http
      .post(`${APIURL}/logout`, this.refreshTokenRequestPayload)
      .subscribe({
        next: (resp) => console.log(resp),
        error: (error) => throwError(() => error),
      });

    this.localStorage.clear('authenticationToken');
    this.localStorage.clear('expiresAt');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('username');
  }

  refreshToken() {
    return this.http
      .post<LoginResponse>(
        `${APIURL}/refresh/token`,
        this.refreshTokenRequestPayload
      )
      .pipe(
        tap((resp) => {
          this.localStorage.clear('authenticationToken');
          this.localStorage.clear('expiresAt');

          this.localStorage.store(
            'authenticationToken',
            resp.authenticationToken
          );
          this.localStorage.store('expiresAt', resp.expiresAt);
        })
      );
  }

  getJwtToken() {
    return this.localStorage.retrieve('authenticationToken');
  }

  getUsername() {
    return this.localStorage.retrieve('username');
  }

  getRefreshToken() {
    return this.localStorage.retrieve('refreshToken');
  }

  isLoggedIn() {
    return this.getJwtToken() != null;
  }
}
