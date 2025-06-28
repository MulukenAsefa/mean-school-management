import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../../shared/components/layout/layout.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import { ViewMyMarksComponent } from './components/view-my-marks/view-my-marks.component';
import { ViewMyAttendanceComponent } from './components/view-my-attendance/view-my-attendance.component';

const routes: Routes = [
{
    path: '',
    component: LayoutComponent,
    children: [
    { path: '', component: StudentDashboardComponent },
    { path: 'my-marks', component: ViewMyMarksComponent },
    { path: 'my-attendance', component: ViewMyAttendanceComponent }, // <-- ADD THIS
    ]
}
];

@NgModule({
imports: [RouterModule.forChild(routes)],
exports: [RouterModule]
})
export class StudentRoutingModule { }
