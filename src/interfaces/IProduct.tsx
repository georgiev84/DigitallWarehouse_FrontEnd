import { Size } from "./Size";

export interface IProduct {
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