// src/app/shared/material.module.ts
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

const modules = [
  MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule,
  MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule,
  MatTableModule, MatSnackBarModule, MatDialogModule, MatSelectModule,
  MatDatepickerModule, MatNativeDateModule, MatRadioModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
