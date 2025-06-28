import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Subject } from '../../../../core/models/subject.model';
import { UserDataService } from '../../../../core/services/user-data.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { SubjectDialogComponent } from '../subject-dialog/subject-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-subjects',
  templateUrl: './manage-subjects.component.html'
})
export class ManageSubjectsComponent implements OnInit {
  subjects$!: Observable<Subject[]>;
  displayedColumns: string[] = ['name', 'description', 'actions'];

  constructor(
    private userDataService: UserDataService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjects$ = this.userDataService.getSubjects();
  }

  openSubjectDialog(subject?: Subject): void {
    const dialogRef = this.dialog.open(SubjectDialogComponent, {
      width: '400px',
      data: { subject: subject || null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (subject) {
          // Update existing subject
          this.userDataService.updateSubject(subject._id, result).subscribe(() => {
            this.notificationService.showSuccess('Subject updated successfully!');
            this.loadSubjects();
          });
        } else {
          // Create new subject
          this.userDataService.createSubject(result).subscribe(() => {
            this.notificationService.showSuccess('Subject created successfully!');
            this.loadSubjects();
          });
        }
      }
    });
  }

  deleteSubject(id: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this subject?'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.userDataService.deleteSubject(id).subscribe(() => {
          this.notificationService.showSuccess('Subject deleted successfully!');
          this.loadSubjects();
        });
      }
    });
  }
}
