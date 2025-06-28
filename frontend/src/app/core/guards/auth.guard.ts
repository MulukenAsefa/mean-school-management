import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    const currentUser = this.authService.currentUserValue;

    if (currentUser) {
      // --- User IS logged in ---

      // If the user is trying to access the root path ('/'), redirect them to their specific dashboard.
      // This is the main redirection logic.
      if (state.url === '/') {
        switch (currentUser.role) {
          case 'Admin':
            return this.router.createUrlTree(['/admin']);
          case 'Teacher':
            return this.router.createUrlTree(['/teacher']);
          case 'Student':
            return this.router.createUrlTree(['/student']);
          default:
            // Fallback for an unknown role, send to login
            return this.router.createUrlTree(['/login']);
        }
      }
      
      // If the user is already logged in and trying to access any other protected route 
      // (like /admin/users), allow the navigation to proceed. The RoleGuard will then check permissions.
      // This is the part that BREAKS THE INFINITE LOOP.
      return true;
    }

    // --- User IS NOT logged in ---
    
    // Redirect any unauthenticated user to the login page.
    // The login/register pages themselves should not have this guard.
    return this.router.createUrlTree(['/login']);
  }
}