import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

// Import all the main page components
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManageSubjectsComponent } from './components/manage-subjects/manage-subjects.component';
import { ManageGradesComponent } from './components/manage-grades/manage-grades.component';

// NOTE: We do NOT import standalone components here anymore.

@NgModule({
  declarations: [
    // We only declare NON-standalone components here.
    AdminDashboardComponent,
    ManageUsersComponent,
    ManageSubjectsComponent,
    ManageGradesComponent,
    // UserDialogComponent, SubjectDialogComponent, and GradeDialogComponent
    // are standalone and have been REMOVED from this list.
  ],
  imports: [
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }