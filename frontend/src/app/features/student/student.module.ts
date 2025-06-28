import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StudentRoutingModule } from './student-routing.module';

import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { ViewMyMarksComponent } from './components/view-my-marks/view-my-marks.component';
import { ViewMyAttendanceComponent } from './components/view-my-attendance/view-my-attendance.component';

@NgModule({
  declarations: [
    StudentDashboardComponent,
    ViewMyMarksComponent,
    ViewMyAttendanceComponent
  ],
  imports: [
    SharedModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
