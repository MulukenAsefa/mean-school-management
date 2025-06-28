import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Mark } from '../../../../core/models/mark.model';
import { UserDataService } from '../../../../core/services/user-data.service';

@Component({
  selector: 'app-view-my-marks',
  templateUrl: './view-my-marks.component.html',
  styleUrls: ['./view-my-marks.component.css']
})
export class ViewMyMarksComponent implements OnInit {
  // These properties were missing
  marks$!: Observable<Mark[]>;
  displayedColumns: string[] = ['subject', 'description', 'marks'];

  constructor(private userDataService: UserDataService) {} // <-- This line is now complete

  ngOnInit(): void {
    this.marks$ = this.userDataService.getMyMarks();
  }
}