import { Injectable } from '@angular/core';
import { Category } from '../models/category';

@Injectable({
    providedIn: 'root'
})

// Holds the global state of the application
export class StateService {
    public isFullScreen = false;
    public currentCategory: Category;

    constructor() {
        this.currentCategory = new Category();
        this.currentCategory.Id = "0";
        this.currentCategory.Name = "All";
        this.currentCategory.Color = "blue";
    }

    toggleFullScreen(){
        this.isFullScreen = !this.isFullScreen;
    }
}
