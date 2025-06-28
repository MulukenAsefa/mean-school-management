import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const currentUser = this.authService.currentUserValue;

    // This is the check for feature routes like '/admin', '/teacher', etc.
    if (route.routeConfig?.path !== '') {
      if (currentUser) {
        // User is logged in, so allow access to the route.
        // The RoleGuard will then check if they have the right role.
        return true;
      }
      // Not logged in, redirect to login page.
      return this.router.createUrlTree(['/login']);
    }

    // This part now only runs for the root path: path: ''
    // It acts as a redirector.
    if (currentUser) {
      switch (currentUser.role) {
        case 'Admin':
          return this.router.createUrlTree(['/admin']);
        case 'Teacher':
          return this.router.createUrlTree(['/teacher']);
        case 'Student':
          return this.router.createUrlTree(['/student']);
        default:
          return this.router.createUrlTree(['/login']);
      }
    }

    // No user and at the root, send to login.
    return this.router.createUrlTree(['/login']);
  }
}