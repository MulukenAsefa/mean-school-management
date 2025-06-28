import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { Mark } from '../../../../core/models/mark.model';
import { UserDataService } from '../../../../core/services/user-data.service';

@Component({
  selector: 'app-view-assigned-students',
  templateUrl: './view-assigned-students.component.html',
  styleUrls: ['./view-assigned-students.component.css']
})
export class ViewAssignedStudentsComponent implements OnInit {
  students$!: Observable<User[]>;
  selectedStudent: User | null = null;
  marks$!: Observable<Mark[]>;
  
  studentDisplayedColumns: string[] = ['name', 'email', 'actions'];
  marksDisplayedColumns: string[] = ['subject', 'marks'];

  constructor(private userDataService: UserDataService) { }

  ngOnInit(): void {
    // This now calls the secure endpoint for teachers
    this.students$ = this.userDataService.getMyStudents();
  }

  viewStudentMarks(student: User): void {
    this.selectedStudent = student;
    this.marks$ = this.userDataService.getMarksForStudent(student._id);
  }

  backToList(): void {
    this.selectedStudent = null;
    this.marks$ = of([]); // Clear marks
  }
}