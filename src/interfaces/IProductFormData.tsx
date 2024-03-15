import { Size } from "./Size";

export interface IProductFormData {
  id: string;
  title: string;
  description: string;
  price: number;
  brand: string;
  brandId: string;
  groups: {
      name:string,
      id:string,
  }[];
  sizes: Size[];
}

export interface ISubmitProductFormData
{
  title: string;
  description: string;
  price: number;
  brandId: string;
  groupIds: string[];
  sizes: Size[];
  
}