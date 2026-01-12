import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7247/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  checkAuth(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/current`, { withCredentials: true })
      .pipe(tap(user => this.currentUserSubject.next(user)));
  }

  login(credentials: LoginRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, credentials, { withCredentials: true })
      .pipe(tap(user => this.currentUserSubject.next(user)));
  }

  register(credentials: RegisterRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, credentials, { withCredentials: true })
      .pipe(tap(user => this.currentUserSubject.next(user)));
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}, { withCredentials: true })
      .pipe(tap(() => this.currentUserSubject.next(null)));
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}