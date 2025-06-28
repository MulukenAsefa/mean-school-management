import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Admin'] },
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'teacher',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Teacher'] },
    loadChildren: () => import('./features/teacher/teacher.module').then(m => m.TeacherModule)
  },
  {
    path: 'student',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['Student'] },
    loadChildren: () => import('./features/student/student.module').then(m => m.StudentModule)
  },
  // --- THIS IS THE MODIFIED ROOT ROUTE ---
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard], // The guard will now handle all redirection
    component: LayoutComponent // We can just point to a simple component
  },
  // --- END OF MODIFICATION ---
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }