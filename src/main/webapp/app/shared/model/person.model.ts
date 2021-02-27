export interface IPerson {
  id?: string;
  name?: string;
  surname?: string;
  birthdate?: string;
  phoneNumber?: string;
  district?: string;
  neighborhood?: string;
  stratus?: string;
  address?: string;
  rh?: string;
  disease?: boolean;
  disability?: boolean;
  relations?: string;
  stateCivil?: string;
  profession?: string;
}

export const defaultValue: Readonly<IPerson> = {
  disease: false,
  disability: false
};
