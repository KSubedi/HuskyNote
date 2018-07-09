import { ApiService } from '../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../services/loading.service';
import { Notebook } from '../../models/notebook';
import { ModalService } from '../../services/modal.service';
import { ChangeCategoryComponent } from '../dialogs/change-category/change-category.component';
import { NotificationService } from '../../services/notification.service';
import { StateService } from '../../services/state.service';

@Component({
    selector: 'app-notes-list',
    templateUrl: './notes-list.component.html',
    styleUrls: ['./notes-list.component.scss'],
})
export class NotesListComponent implements OnInit {

    constructor(private apiService: ApiService,
        private loadingService: LoadingService,
        private stateService: StateService,
        private modalService: ModalService,
        private notificationService: NotificationService) { }

    private notebooks: Notebook[];

    ngOnInit() {
        // Subscribe to update stream to refresh automatically if there are new notes
        this.apiService.updateStream$
            .subscribe((update) => {
                this.updateNotes();
            })
    }

    updateNotes() {
        // Set loading to load date on init
        this.loadingService.set("", false);

        // Get the notes and assign them
        this.apiService.getNotes(this.stateService.currentCategory)
            .subscribe((notebooks: Notebook[]) => {
                // Set the data
                this.loadingService.unset();
                this.notebooks = notebooks;
            }, error => {
                error.error.messages.forEach(message => {
                    this.notificationService.add({
                        Title: "Failed To Load Notebooks",
                        Body: message,
                        Type: "error" 
                    });
                });
                this.loadingService.unset();
            });
    }

    openCategoryChooser(){
        this.modalService.show("Choose Category", ChangeCategoryComponent);
    }
}
