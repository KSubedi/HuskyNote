import { Component } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './services/modal.service';
import { StateService } from './services/state.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})

export class AppComponent {
    constructor(private loadingService: LoadingService,
                private modalService: ModalService,
                private stateService: StateService){
        
    }
}
 