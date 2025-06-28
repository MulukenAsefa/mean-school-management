import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Attendance } from '../../../../core/models/attendance.model';
import { UserDataService } from '../../../../core/services/user-data.service';

@Component({
  selector: 'app-view-my-attendance',
  templateUrl: './view-my-attendance.component.html',
  styleUrls: ['./view-my-attendance.component.css']
})
export class ViewMyAttendanceComponent implements OnInit {
  attendance$!: Observable<Attendance[]>;
  displayedColumns: string[] = ['date', 'status'];

  constructor(private userDataService: UserDataService) {}

  ngOnInit(): void {
    this.attendance$ = this.userDataService.getMyAttendance();
  }

  calculatePercentage(records: Attendance[]): number {
    if (!records || records.length === 0) {
      return 100;
    }
    const presentCount = records.filter(r => r.status === 'Present' || r.status === 'Late').length;
    return Math.round((presentCount / records.length) * 100);
  }
}
