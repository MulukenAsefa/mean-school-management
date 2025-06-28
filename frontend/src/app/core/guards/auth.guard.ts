import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      // User is logged in. Redirect them to their specific dashboard.
      // This handles the case where a logged-in user visits the root URL ('/')
      // or refreshes a page they have access to.
      switch (currentUser.role) {
        case 'Admin':
          // If the user is already on an admin path, let them stay.
          if (this.router.url.startsWith('/admin')) {
            return true;
          }
          this.router.navigate(['/admin']);
          return false;
        case 'Teacher':
          // If the user is already on a teacher path, let them stay.
          if (this.router.url.startsWith('/teacher')) {
            return true;
          }
          this.router.navigate(['/teacher']);
          return false;
        case 'Student':
          // If the user is already on a student path, let them stay.
          if (this.router.url.startsWith('/student')) {
            return true;
          }
          this.router.navigate(['/student']);
          return false;
        default:
          // Fallback for an unknown role
          this.router.navigate(['/login']);
          return false;
      }
    }

    // User is not logged in, redirect them to the login page.
    this.router.navigate(['/login']);
    return false;
  }
}