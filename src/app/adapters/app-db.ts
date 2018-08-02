import Dexie from 'dexie';
import { Notebook } from "../models/notebook";
import { Category } from "../models/category";

export class AppDb extends Dexie {
    Notebooks: Dexie.Table<INotebook, Number>;
    Categories: Dexie.Table<ICategory, Number>;

    constructor(){
        super("HuskyAppDb");

        this.version(1).stores({
            Notebooks: "++Id, Name, Color, Description, Category, CreatedDate, LastModifiedDate",
            Categories: "++Id, Name, Color, Description, Parent, CreatedDate, LastModifiedDate"
        });

        this.Notebooks.mapToClass(Notebook);
        this.Categories.mapToClass(Category);
    }
}

export interface INotebook{
    Id?: Number;
    Name: string;
    Color: string;
    Description?: string;
    Category?: ICategory;
    CreatedDate: Date;
    LastModifiedDate: Date;
}

export interface ICategory{
    Id?: Number;
    Name: string;
    Color: string;
    Description?: string;
    Parent?: ICategory;
    CreatedDate: Date;
    LastModifiedDate: Date;
}