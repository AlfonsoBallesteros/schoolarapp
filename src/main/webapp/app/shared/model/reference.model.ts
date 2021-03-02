import { IType } from 'app/shared/model/type.model';
import { State } from 'app/shared/model/enumerations/state.model';

export interface IReference {
  id?: string;
  name?: string;
  value?: string;
  state?: State;
  types?: IType[];
}

export const defaultValue: Readonly<IReference> = {};
