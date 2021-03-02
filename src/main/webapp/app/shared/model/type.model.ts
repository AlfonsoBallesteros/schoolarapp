import { State } from 'app/shared/model/enumerations/state.model';

export interface IType {
  id?: string;
  code?: string;
  name?: string;
  value?: string;
  parent?: string;
  state?: State;
  referenceId?: string;
}

export const defaultValue: Readonly<IType> = {};
