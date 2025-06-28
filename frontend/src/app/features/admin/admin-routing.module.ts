import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ManageSubjectsComponent } from './components/manage-subjects/manage-subjects.component';
import { ManageGradesComponent } from './components/manage-grades/manage-grades.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'users', component: ManageUsersComponent },
      { path: 'subjects', component: ManageSubjectsComponent },
      { path: 'grades', component: ManageGradesComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }