import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Grade } from '../../../../core/models/grade.model';
import { UserDataService } from '../../../../core/services/user-data.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { GradeDialogComponent } from '../grade-dialog/grade-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-grades',
  templateUrl: './manage-grades.component.html',
})
export class ManageGradesComponent implements OnInit {
  grades$!: Observable<Grade[]>;
  displayedColumns: string[] = ['name', 'teacher', 'actions'];

  constructor(
    private userDataService: UserDataService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadGrades();
  }

  loadGrades(): void {
    this.grades$ = this.userDataService.getGrades();
  }

  openGradeDialog(grade?: Grade): void {
    const dialogRef = this.dialog.open(GradeDialogComponent, {
      width: '400px',
      data: { grade: grade || null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (grade) {
          // Update existing grade
          this.userDataService.updateGrade(grade._id, result).subscribe(() => {
            this.notificationService.showSuccess('Grade updated successfully!');
            this.loadGrades();
          });
        } else {
          // Create new grade
          this.userDataService.createGrade(result).subscribe(() => {
            this.notificationService.showSuccess('Grade created successfully!');
            this.loadGrades();
          });
        }
      }
    });
  }

  deleteGrade(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this grade?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.userDataService.deleteGrade(id).subscribe(() => {
          this.notificationService.showSuccess('Grade deleted successfully!');
          this.loadGrades();
        });
      }
    });
  }
}
