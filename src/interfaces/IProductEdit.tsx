import { IProduct } from "./IProduct";
import { IProductFormData } from "./IProductFormData";

export interface IProductEdit {
    item: IProduct;
    edit: boolean;
}