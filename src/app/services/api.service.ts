import { ApiResponse } from '../models/apiresponse';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Notebook } from '../models/notebook';
import { Observable, BehaviorSubject, observable } from 'rxjs';
import { Category } from '../models/category';
import { LocalStorageAdapter } from '../adapters/local';
import { AppDb } from '../adapters/app-db';

@Injectable()
export class ApiService {

    public updateStream$: BehaviorSubject<boolean>;
    // private storage: LocalStorageAdapter;


    private T_NOTEBOOK = "noteboooks";
    private T_CATEGORY = "categories";

    private db: AppDb;


    constructor(private http: HttpClient) {
        // This will update te listeners when there are changes 
        this.updateStream$ = new BehaviorSubject<boolean>(null);

        this.db = new AppDb();
    }

    // Get all notebooks
    public getNotes(category: Category): Observable<Notebook[]> {
        // Return an observable with the data
        return new Observable<Notebook[]>(subscriber => {

            this.db.Notebooks.toArray().then((categories) => {
                subscriber.next(categories);
                subscriber.complete();
            }).catch(error => {
                subscriber.error(error);
                subscriber.complete();
            });


        });
    }

    // Gets theh categories
    public getCategories(): Observable<Category[]> {

        // Return observable with data
        return new Observable<Category[]>(subscriber => {

            this.db.Categories.toArray().then((categories) => {
                subscriber.next(categories);
                subscriber.complete();
            });
        });
    }

    // Adds a new category
    public addCategory(category: Category): Observable<ApiResponse> {
        this.db.Categories.put(category);

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

        this.db.Notebooks.put(notebook);

        // Push updates to subscribers
        this.pushUpdates();

        // Return the observable with api response
        return new Observable<ApiResponse>(subscriber => {
            subscriber.next(apiResponse);
            subscriber.complete();
        });
    }

    // This will pus updates on the update stream
    public pushUpdates() {
        this.updateStream$.next(true);
    }
}
