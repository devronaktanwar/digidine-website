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
  _id: string;
  name: string;
  original_price: number;
  selling_price: number;
}
