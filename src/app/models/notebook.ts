import { Category } from "./category";

export class Notebook{
    Id?: number;
    Name: string;
    Color?: string;
    Description: string;
    IsDeleted?: boolean;
    Category: Category;
}