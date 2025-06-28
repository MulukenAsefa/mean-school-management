// src/app/core/models/mark.model.ts
import { Subject } from "./subject.model";
import { User } from "./user.model";

export interface Mark {
  _id: string;
  student: User;
  subject: Subject;
  marks: number;
}