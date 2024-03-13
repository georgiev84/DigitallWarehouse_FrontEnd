import { Size } from "./Size";

export interface IProduct {
    id: string;
    title: string;
    description: string;
    price: number;
    brand: string;
    groups: string[];
    sizes: Size[];
}