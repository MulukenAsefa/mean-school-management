import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/user.model';
import { Subject as SchoolSubject } from '../models/subject.model';
import { Grade } from '../models/grade.model';
import { Mark } from '../models/mark.model';
import { Attendance } from '../models/attendance.model';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  // --- Teacher Specific ---
  getMyStudents(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/my-students`);
  }

  // ... rest of the service ...
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
  updateUser(id: string, userData: Partial<User & { gradeId?: string }>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, userData);
  }
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`);
  }
  getSubjects(): Observable<SchoolSubject[]> {
    return this.http.get<SchoolSubject[]>(`${this.apiUrl}/subjects`);
  }
  createSubject(subjectData: Partial<SchoolSubject>): Observable<SchoolSubject> {
    return this.http.post<SchoolSubject>(`${this.apiUrl}/subjects`, subjectData);
  }
  updateSubject(id: string, subjectData: Partial<SchoolSubject>): Observable<SchoolSubject> {
    return this.http.put<SchoolSubject>(`${this.apiUrl}/subjects/${id}`, subjectData);
  }
  deleteSubject(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/subjects/${id}`);
  }
  getGrades(): Observable<Grade[]> {
    return this.http.get<Grade[]>(`${this.apiUrl}/grades`);
  }
  createGrade(gradeData: Partial<Grade>): Observable<Grade> {
    return this.http.post<Grade>(`${this.apiUrl}/grades`, gradeData);
  }
  updateGrade(id: string, gradeData: Partial<Grade>): Observable<Grade> {
    return this.http.put<Grade>(`${this.apiUrl}/grades/${id}`, gradeData);
  }
  deleteGrade(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/grades/${id}`);
  }
  assignMark(markData: {studentId: string, subjectId: string, marks: number}): Observable<Mark> {
    return this.http.post<Mark>(`${this.apiUrl}/marks`, markData);
  }
  getMyMarks(): Observable<Mark[]> {
    return this.http.get<Mark[]>(`${this.apiUrl}/marks/mystudent`);
  }
  getMarksForStudent(studentId: string): Observable<Mark[]> {
    return this.http.get<Mark[]>(`${this.apiUrl}/marks/student/${studentId}`);
  }

  // --- Attendance Methods ---

  markAttendance(records: { studentId: string, date: string, status: string }[]): Observable<any> {
    return this.http.post(`${this.apiUrl}/attendance`, { records });
  }

  getMyAttendance(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/attendance/my`);
  }
  
  getStudentAttendanceByDate(date: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/attendance/students/${date}`);
  }
}
