import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { NotificationService } from './notification.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router,
    private notificationService: NotificationService
  ) {
    const user = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(user ? JSON.parse(user) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  public get token(): string | null {
    return localStorage.getItem('token');
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        if (response && response.token && response.user) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
          this.navigateToDashboard(response.user.role);
        }
      }),
      catchError(err => {
        this.notificationService.showError(err.error.message || 'Login failed');
        return of(null); // Return a null observable to prevent breaking the stream
      })
    );
  }

  // <-- NEW METHOD ADDED HERE
  register(userData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/register`, userData).pipe(
      tap(() => {
        this.notificationService.showSuccess('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      }),
      catchError(err => {
        this.notificationService.showError(err.error.message || 'Registration failed');
        return of(null);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  hasRole(requiredRole: string): boolean {
    return this.currentUserValue?.role === requiredRole;
  }

  private navigateToDashboard(role: string): void {
    switch (role) {
      case 'Admin':
        this.router.navigate(['/admin']);
        break;
      case 'Teacher':
        this.router.navigate(['/teacher']);
        break;
      case 'Student':
        this.router.navigate(['/student']);
        break;
      default:
        this.router.navigate(['/login']);
        break;
    }
  }
}