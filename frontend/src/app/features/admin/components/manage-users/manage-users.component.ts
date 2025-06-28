import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { UserDataService } from '../../../../core/services/user-data.service';
import { NotificationService } from '../../../../core/services/notification.service';
import { UserDialogComponent } from '../user-dialog/user-dialog.component';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users$!: Observable<User[]>;
  displayedColumns: string[] = ['name', 'email', 'role', 'grade', 'actions'];

  constructor(
    private userDataService: UserDataService,
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.users$ = this.userDataService.getUsers();
  }

  openUserDialog(user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '400px',
      data: { user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userDataService.updateUser(user._id, result).subscribe(() => {
          this.notificationService.showSuccess('User updated successfully!');
          this.loadUsers();
        });
      }
    });
  }

  deleteUser(userId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Deletion',
        message: 'Are you sure you want to delete this user? This action cannot be undone.'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.userDataService.deleteUser(userId).subscribe(() => {
          this.notificationService.showSuccess('User deleted successfully!');
          this.loadUsers();
        });
      }
    });
  }
}
