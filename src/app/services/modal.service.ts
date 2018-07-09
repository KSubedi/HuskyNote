import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    // Defaults
    private defaultTitle: string = "Husky Notes";

    public isShowing: boolean = false;
    public title: string = this.defaultTitle;

    private changeObservable: BehaviorSubject<any>;

    constructor() {
        this.changeObservable = new BehaviorSubject<any>(null);
    }

    // Returmn the change observable
    getComponentChanger(): BehaviorSubject<any>{
        return this.changeObservable;
    }

    // Show the modal
    show(title: string, component: any){
        this.isShowing = true;
        this.title = title;
        this.changeObservable.next(component);
    }

    // Close modal
    close(){
        this.isShowing = false;
        this.title = this.defaultTitle;
    }
}
