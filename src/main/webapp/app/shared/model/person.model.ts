import { Moment } from 'moment';
import { IEnrollment } from 'app/shared/model/enrollment.model';
import { ICourse } from 'app/shared/model/course.model';
import { State } from 'app/shared/model/enumerations/state.model';

export interface IPerson {
  id?: string;
  name?: string;
  surname?: string;
  documentId?: string;
  documentExpDate?: Moment;
  phoneNumber?: string;
  telephonNumber?: string;
  birthdate?: Moment;
  address?: string;
  district?: string;
  stratus?: string;
  disease?: boolean;
  disability?: boolean;
  stateCivil?: string;
  ocupation?: string;
  parent?: string;
  state?: State;
  enrollments?: IEnrollment[];
  typeIdId?: string;
  genderId?: string;
  neighborhoodId?: string;
  cityId?: string;
  birthplaceId?: string;
  nacionalityId?: string;
  cityExpId?: string;
  rhId?: string;
  epsId?: string;
  relationId?: string;
  courses?: ICourse[];
}

export const defaultValue: Readonly<IPerson> = {
  disease: false,
  disability: false
};
