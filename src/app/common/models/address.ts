export interface Address {
  street: string;
  place: string;
  zip: number;
}

export const defaultAddress: Address = {
  street: undefined,
  place: undefined,
  zip: undefined
};
