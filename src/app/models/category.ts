import { ICategory } from "../adapters/app-db";


export class Category implements ICategory{
    Id?: Number;
    Name: string;
    Color: string;
    Description?: string;
    Parent?: ICategory;
    CreatedDate: Date;
    LastModifiedDate: Date;
}