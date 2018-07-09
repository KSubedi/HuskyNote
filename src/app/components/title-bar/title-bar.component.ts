import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'app-title-bar',
    templateUrl: './title-bar.component.html',
    styleUrls: ['./title-bar.component.scss']
})
export class TitleBarComponent implements OnInit {
    
    constructor(private loadingService: LoadingService,
                private stateService: StateService) { }

    ngOnInit() {
    }
}
