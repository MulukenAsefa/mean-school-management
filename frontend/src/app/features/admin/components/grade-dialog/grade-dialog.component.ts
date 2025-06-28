import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Grade } from '../../../../core/models/grade.model';
import { User } from '../../../../core/models/user.model';
import { UserDataService } from '../../../../core/services/user-data.service';

// --- Imports for Standalone Components ---
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-grade-dialog',
  standalone: true, // <-- It is standalone
  imports: [
    // <-- It imports its own dependencies
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './grade-dialog.component.html',
})
export class GradeDialogComponent implements OnInit {
  form: FormGroup;
  isEditMode: boolean;
  teachers$!: Observable<User[]>;

  constructor(
    private fb: FormBuilder,
    private userDataService: UserDataService,
    public dialogRef: MatDialogRef<GradeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { grade: Grade }
  ) {
    this.isEditMode = !!data.grade;
    this.form = this.fb.group({
      name: [data.grade?.name || '', Validators.required],
      teacherId: [data.grade?.teacher?._id || null],
    });
  }

  ngOnInit(): void {
    this.teachers$ = this.userDataService.getUsers().pipe(
      map(users => users.filter(user => user.role === 'Teacher'))
    );
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