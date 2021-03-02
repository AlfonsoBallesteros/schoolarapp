import { State } from 'app/shared/model/enumerations/state.model';

export interface IEnrollment {
  id?: string;
  peaceSafeFile?: string;
  academicFile?: string;
  docStudentFile?: string;
  docDadFile?: string;
  docMomFile?: string;
  docTutorFile?: string;
  academicPeriod?: string;
  year?: string;
  obs?: string;
  workingDay?: string;
  enrollModality?: string;
  legacy?: boolean;
  state?: State;
  workShopId?: string;
  gradeProxId?: string;
  studentId?: string;
}

export const defaultValue: Readonly<IEnrollment> = {
  legacy: false
};
