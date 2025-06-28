import { User } from './user.model';

export interface Attendance {
  _id: string;
  student: User | string;
  date: string;
  status: 'Present' | 'Absent' | 'Late';
  markedBy: User | string;
}
