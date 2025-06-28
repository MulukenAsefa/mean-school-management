// src/app/core/guards/role.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service'; // Assume you have a simple snackbar service

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router,
    private notificationService: NotificationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as Array<string>;
    const currentUser = this.authService.currentUserValue;

    if (!currentUser || !expectedRoles.includes(currentUser.role)) {
      this.notificationService.showError("You don't have permission to access this page.");
      this.router.navigate(['/']); // Redirect to a safe page
      return false;
    }
    return true;
  }
}