import { Dexie } from "dexie";

export default class AppDb extends Dexie {
    Notebooks: Dexie.Table<INotebook, Number>;
    Categories: Dexie.Table<ICategory, Number>;

    constructor(){
        super("AppDb");

        this.version(1).stores({
            Notebooks: "++Id, Name, Color, Description, Category, CreatedDate, LastModifiedDate",
            Categories: "++Id, Name, Color, Description, Parent, CreatedDate, LastModifiedDate"
        });
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