import { ApiResponse } from '../models/apiresponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notebook } from '../models/notebook';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import { Category } from '../models/category';
import { LocalStorageAdapter } from '../adapters/local';

@Injectable()
export class ApiService {

    public updateStream$: BehaviorSubject<boolean>;
    private storage: LocalStorageAdapter;


    private T_NOTEBOOK = "noteboooks";
    private T_CATEGORY = "categories";

    constructor(private http: HttpClient) {
        // Set the storage adapter here
        this.storage = new LocalStorageAdapter();

        // This will update te listeners when there are changes 
        this.updateStream$ = new BehaviorSubject<boolean>(null);
    }

    // Get all notebooks
    public getNotes(category: Category): Observable<Notebook[]> {
        // Get the notes from storage
        let storageResponse = this.storage.get(this.T_NOTEBOOK);

        // Get the notebooks
        let notebooks: Array<Notebook> = storageResponse.Data;

        // Filter by category
        if(category.Id !== "0"){
            notebooks = notebooks.filter(notebook => {
                notebook.Category === category;
            });
        }

        // If the notebooks are empty and there is no error,
        // return empty array
        if(notebooks === null && !storageResponse.Error){
            notebooks = [];
        }

        // Return an observable with the data
        return new Observable<Notebook[]>(subscriber => {
            // If it is api error, return error as is
            if(storageResponse.Error){
                subscriber.error(storageResponse);
            }else{
                // If there is no error, return the notebooks
                subscriber.next(notebooks);
            }

            subscriber.complete();
        })
    }

    // Gets theh categories
    public getCategories(): Observable<Category[]>{
        // Get data from storage
        let storageResponse = this.storage.get(this.T_CATEGORY);

        // Get categories
        let categories: Array<Category> = storageResponse.Data;

        // Return empty array if there is no data
        if(categories === null && !storageResponse.Error){
            categories = [];
        }

        categories.push({
            Name: "All",
            Id: "0",
            Color: "blue",
            Description: ""
        });

        // Return observable with data
        return new Observable<Category[]>(subscriber => {
            if(storageResponse.Error){
                subscriber.error(storageResponse);
            }else{
                subscriber.next(categories);
            }

            subscriber.complete();
        })
    }

    // Adds a new category
    public addCategory(category: Category): Observable<ApiResponse> {
        // Get the existing categories
        let categories: Array<Category> = this.storage.get(this.T_CATEGORY).Data;

        // Create an empty array if it doesnt already exist
        if(categories === null){
            categories = [];
        }

        // Push the new category to the existing list
        categories.push(category);

        // Set the data to storage
        this.storage.set(this.T_CATEGORY, categories);

        // Send updates
        this.pushUpdates();

        // Respond with observable
        return new Observable<ApiResponse>(subscriber => {
            subscriber.next(new ApiResponse());
            subscriber.complete();
        })
    }

    // Adds new notebook
    public addNewNotebook(notebook: Notebook): Observable<ApiResponse> {
        // Create new api response to return
        let apiResponse = new ApiResponse();

        // Get notebooks from storage
        let notebooks: Array<Notebook> = this.storage.get(this.T_NOTEBOOK).Data;

        // Create a new notebook array if its empty
        if(notebooks === null){
            notebooks = [];
        }

        // Push the new notebook to the array
        notebooks.push(notebook);

        // Save it to storage
        this.storage.set(this.T_NOTEBOOK, notebooks);
        
        // Push updates to subscribers
        this.pushUpdates();

        // Return the observable with api response
        return new Observable<ApiResponse>(subscriber => {
            subscriber.next(apiResponse);
            subscriber.complete();
        });
    }

    // This will pus updates on the update stream
    public pushUpdates(){
        this.updateStream$.next(true);
    }
}
