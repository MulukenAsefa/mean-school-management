import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { User } from '../../../../core/models/user.model';
import { UserDataService } from '../../../../core/services/user-data.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { Attendance } from '../../../../core/models/attendance.model';

@Component({
  selector: 'app-mark-attendance',
  templateUrl: './mark-attendance.component.html',
  styleUrls: ['./mark-attendance.component.css']
})
export class MarkAttendanceComponent implements OnInit {
  dateControl = new FormControl(new Date(), Validators.required);
  attendanceForm!: FormGroup;
  students$!: Observable<User[]>;
  statuses: ('Present' | 'Absent' | 'Late')[] = ['Present', 'Absent', 'Late'];

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.attendanceForm = this.fb.group({});
    this.students$ = this.userDataService.getMyStudents().pipe(
      tap(students => {
        this.buildForm(students);
        this.loadAttendanceForDate();
      })
    );
  }
  
  buildForm(students: User[]): void {
    students.forEach(student => {
      this.attendanceForm.addControl(student._id, this.fb.control('Present', Validators.required));
    });
  }
  
  onDateChange(): void {
    this.loadAttendanceForDate();
  }

  loadAttendanceForDate(): void {
    if (!this.dateControl.value) return;

    const selectedDate = this.dateControl.value.toISOString().split('T')[0];
    this.userDataService.getStudentAttendanceByDate(selectedDate).subscribe(records => {
      records.forEach(record => {
        const studentId = (record.student as User)._id;
        if (this.attendanceForm.get(studentId)) {
          this.attendanceForm.get(studentId)?.setValue(record.status);
        }
      });
    });
  }

  onSubmit(): void {
    if (this.attendanceForm.invalid || !this.dateControl.value) {
      return;
    }
    const selectedDate = this.dateControl.value.toISOString();
    const records = Object.keys(this.attendanceForm.value).map(studentId => {
      return {
        studentId: studentId,
        date: selectedDate,
        status: this.attendanceForm.value[studentId]
      };
    });

    this.userDataService.markAttendance(records).subscribe(() => {
      this.notificationService.showSuccess('Attendance saved successfully!');
    });
  }
}
