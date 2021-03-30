import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler/src/ml_parser/lexer';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AUTH_API_URL } from '../../app-injection-tokens';
import { tap } from 'rxjs/operators';

export const ACCESS_TOKEN_KEY = 'app_access_token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: any;

  constructor(
    private http: HttpClient,
    @Inject(AUTH_API_URL) private apiUrl: string,
    private jwtHelper: JwtHelperService,
  ) { }

  login(email: string, password: string): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}api/auth/login`, {email, password})
    .pipe(
      tap((token: any) => {
        localStorage.clear();
        localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
      })
    );
  }
   
  getRole(): string [] {
    if(this.isAuthenticated()) {
      this.token = localStorage.getItem(ACCESS_TOKEN_KEY);
      return [this.jwtHelper.decodeToken(this.token).role];
    }
    return [];
  }

  getAccountId(): string {
    if(this.isAuthenticated()) {
      this.token = localStorage.getItem(ACCESS_TOKEN_KEY);
      return this.jwtHelper.decodeToken(this.token).sub;
    }
    return "";
  }

  isAuthenticated(): boolean {
    this.token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return this.token && !this.jwtHelper.isTokenExpired(this.token);
  }

  logout(): void {
    localStorage.clear();
    location.reload();
  }
}
