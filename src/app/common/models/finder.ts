import { Address } from './address';

export interface FinderModel {
  name: string;
  address?: Address;
  phone?: string;
  email: string;
}
