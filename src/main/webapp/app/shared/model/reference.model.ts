import { State } from 'app/shared/model/enumerations/state.model';

export interface IReference {
  id?: string;
  name?: string;
  value?: string;
  state?: State;
}

export const defaultValue: Readonly<IReference> = {};
