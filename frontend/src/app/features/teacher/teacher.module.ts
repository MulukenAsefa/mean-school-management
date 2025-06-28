import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TeacherRoutingModule } from './teacher-routing.module';

import { TeacherDashboardComponent } from './components/teacher-dashboard/teacher-dashboard.component';
import { AssignMarksComponent } from './components/assign-marks/assign-marks.component';
import { ViewAssignedStudentsComponent } from './components/view-assigned-students/view-assigned-students.component';
import { MarkAttendanceComponent } from './components/mark-attendance/mark-attendance.component';

@NgModule({
  declarations: [
    TeacherDashboardComponent,
    AssignMarksComponent,
    ViewAssignedStudentsComponent,
    MarkAttendanceComponent
  ],
  imports: [
    SharedModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
