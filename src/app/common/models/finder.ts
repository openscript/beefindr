import { Address, defaultAddress } from './address';

export interface Finder {
  name: string;
  address: Address;
  email: string;
}

export const defaultFinder: Finder = {
  name: undefined,
  address: defaultAddress,
  email: undefined
};
