import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDataService } from '../../../../core/services/user-data.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  averageMark$!: Observable<number | string>;
  userName!: string | undefined;

  constructor(
    private userDataService: UserDataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userName = this.authService.currentUserValue?.name;
    this.averageMark$ = this.userDataService.getMyMarks().pipe(
      map(marks => {
        if (marks.length === 0) {
          return 'N/A';
        }
        const total = marks.reduce((sum, current) => sum + current.marks, 0);
        return Math.round(total / marks.length);
      })
    );
  }
}