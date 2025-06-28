import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from '../../../../core/services/user-data.service';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.css']
})
export class TeacherDashboardComponent implements OnInit {
  studentCount$!: Observable<number>;
  subjectCount$!: Observable<number>;

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.studentCount$ = this.userDataService.getUsers().pipe(
      map(users => users.filter(user => user.role === 'Student').length)
    );
    this.subjectCount$ = this.userDataService.getSubjects().pipe(
      map(subjects => subjects.length)
    );
  }
}