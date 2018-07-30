import { Category } from "./category";
import { INotebook, ICategory } from "../adapters/app-db";

export class Notebook implements INotebook{
    Id?: Number;
    Name: string;
    Color: string;
    Description?: string;
    Category?: ICategory;
    CreatedDate: Date;
    LastModifiedDate: Date;
}