export type Status = 'ACTIVE' | 'INACTIVE';
export interface IMenuItemProps {
  _id: string;
  label: string;
  description: string;
  original_price: number;
  selling_price: number;
  type: string;
  category: string;
  status: Status;
  image: string;
  addons: Addon[];
  business_id: string;
}
export interface Addon {
  name: string;
  original_price: number;
  selling_price: number;
}
