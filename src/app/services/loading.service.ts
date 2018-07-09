import { Injectable } from '@angular/core';

// Simple service to keep track of loading items
@Injectable()
export class LoadingService {

    // Defaults
    private defaultMessage: string = "Loading...";

    public isLoading  : boolean = false;
    public message    : string  = this.defaultMessage;
    public showMessage: boolean = true;

    // Sets the loading option and the message
    set(message: string = this.defaultMessage, showMessage: boolean = true) {
        this.isLoading   = true;
        this.message     = message;
        this.showMessage = showMessage;
    }

    // Unsets the loading option
    unset() {
        this.isLoading   = false;
        this.message     = this.defaultMessage;
        this.showMessage = true;
    }

}
