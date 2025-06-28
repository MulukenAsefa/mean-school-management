import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { Subject as SchoolSubject } from '../../../../core/models/subject.model';
import { UserDataService } from '../../../../core/services/user-data.service';
import { NotificationService } from '../../../../core/services/notification.service';

@Component({
  selector: 'app-assign-marks',
  templateUrl: './assign-marks.component.html',
  styleUrls: ['./assign-marks.component.css']
})
export class AssignMarksComponent implements OnInit {
  form: FormGroup;
  students$!: Observable<User[]>;
  subjects$!: Observable<SchoolSubject[]>;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    private notificationService: NotificationService
  ) {
    this.form = this.fb.group({
      studentId: ['', Validators.required],
      subjectId: ['', Validators.required],
      marks: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit(): void {
    // This is the line that fetches the students for the dropdown
    this.students$ = this.userDataService.getMyStudents();
    this.subjects$ = this.userDataService.getSubjects();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.userDataService.assignMark(this.form.value).subscribe(() => {
      this.notificationService.showSuccess('Mark assigned successfully!');
      this.form.controls['marks'].reset();
    });
  }
}