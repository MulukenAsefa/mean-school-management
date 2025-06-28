// src/app/core/models/grade.model.ts
import { User } from "./user.model";

export interface Grade {
  _id: string;
  name: string;
  teacher?: User; // Optional teacher object
}