import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

// Holds the global state of the application
export class StateService {
    public isFullScreen = false;

    constructor() { }

    toggleFullScreen(){
        this.isFullScreen = !this.isFullScreen;
    }
}
