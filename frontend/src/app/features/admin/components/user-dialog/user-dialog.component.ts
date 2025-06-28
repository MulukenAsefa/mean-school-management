import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { User } from '../../../../core/models/user.model';
import { Grade } from '../../../../core/models/grade.model';
import { UserDataService } from '../../../../core/services/user-data.service';

// --- Imports for Standalone Components ---
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-user-dialog',
  standalone: true, // This component is standalone
  imports: [
    // It imports all its own dependencies here
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-dialog.component.html',
})
export class UserDialogComponent implements OnInit {
  form: FormGroup;
  roles: string[] = ['Student', 'Teacher', 'Admin'];
  grades$!: Observable<Grade[]>;
  isStudent = false;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.isStudent = this.data.user.role === 'Student';
    this.form = this.fb.group({
      name: [data.user.name, Validators.required],
      email: [data.user.email, [Validators.required, Validators.email]],
      role: [data.user.role, Validators.required],
      gradeId: [data.user.grade?._id || null] // <-- THIS LINE IS THE FIX
    });

    this.form.get('role')?.valueChanges.subscribe((role: string) => {
      this.isStudent = (role === 'Student');
      if (!this.isStudent) {
        // When role is not student, clear the gradeId
        this.form.get('gradeId')?.setValue(null);
      }
    });
  }

  ngOnInit(): void {
    this.grades$ = this.userDataService.getGrades();
  }

  onSave(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
