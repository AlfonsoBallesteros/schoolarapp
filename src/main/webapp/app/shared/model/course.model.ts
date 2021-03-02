import { IPerson } from 'app/shared/model/person.model';

export interface ICourse {
  id?: string;
  name?: string;
  hour?: string;
  grade?: string;
  teacherId?: string;
  students?: IPerson[];
}

export const defaultValue: Readonly<ICourse> = {};
