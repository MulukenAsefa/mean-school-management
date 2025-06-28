import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { AssignMarksComponent } from './components/assign-marks/assign-marks.component';
import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { ViewAssignedStudentsComponent } from './components/view-assigned-students/view-assigned-students.component';
import { MarkAttendanceComponent } from './components/mark-attendance/mark-attendance.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: TeacherDashboardComponent },
      { path: 'assign-marks', component: AssignMarksComponent },
      { path: 'view-students', component: ViewAssignedStudentsComponent },
      { path: 'mark-attendance', component: MarkAttendanceComponent }, // <-- ADD THIS
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
