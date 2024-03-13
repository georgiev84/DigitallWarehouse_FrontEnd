export interface IProductFormData {
  title: string;
  description: string;
  price: number;
  brandId: string;
  groupIds: string[];
  sizeInformation: Array<{ name:string, sizeId: string; quantity: number }>;
}