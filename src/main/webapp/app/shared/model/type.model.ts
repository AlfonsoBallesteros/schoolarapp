import { State } from 'app/shared/model/enumerations/state.model';

export interface IType {
  id?: string;
  code?: string;
  name?: string;
  value?: string;
  state?: State;
}

export const defaultValue: Readonly<IType> = {};
