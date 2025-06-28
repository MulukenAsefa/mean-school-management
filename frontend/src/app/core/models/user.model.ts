import { Grade } from "./grade.model";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Teacher' | 'Student';
  grade?: Grade;
}
