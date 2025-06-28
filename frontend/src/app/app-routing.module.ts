import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { LoginComponent } from './features/auth/login/login.component';
import { AuthService } from './core/services/auth.service';
import { map } from 'rxjs/operators';
import { User } from './core/models/user.model';
import { RegisterComponent } from './features/auth/register/register.component'; // <-- IMPORT ADDED HERE

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }, // <-- ROUTE ADDED HERE
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
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    resolve: {
        url: () => inject(AuthService).currentUser.pipe(
            map((user: User | null) => {
                switch(user?.role) {
                    case 'Admin': return '/admin';
                    case 'Teacher': return '/teacher';
                    case 'Student': return '/student';
                    default: return '/login';
                }
            })
        )
    },
    component: LoginComponent,
  },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }