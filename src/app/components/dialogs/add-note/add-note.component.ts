import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Notebook } from '../../../models/notebook';
import { LoadingService } from '../../../services/loading.service';
import { Router } from '@angular/router';
import { ModalService } from '../../../services/modal.service';
import { NotificationService } from '../../../services/notification.service';
import { Category } from '../../../models/category';

@Component({
    selector   : 'app-add-note',
    templateUrl: './add-note.component.html',
    styleUrls  : ['./add-note.component.scss']
})
export class AddNoteComponent implements OnInit {

    categories: Array<Category> = [];
    currentCategoryColor: string = "";

    constructor(private apiService: ApiService,
        private loadingService     : LoadingService,
        private router             : Router,
        private modalService       : ModalService,
        private notificationService: NotificationService) {

    }

    ngOnInit() {
        // Get all categories on init
        this.apiService.getCategories().subscribe(cat => {
            this.categories = cat;
        }, error => {
            this.notificationService.add({
                Title: "Could Not Load Categories!",
                Body : "The categories could not be loaded. Please refresh and try again!",
                Type : "error"
            })
        });
    }

    // Default model 
    formData: Notebook = {
        Name       : "",
        Category   : "default",
        Description: ""
    }

    submit() {
        // Set a loading message
        this.loadingService.set("", false);

        // Submit the form
        this.apiService.addNewNotebook(this.formData)
            .subscribe(data => {
                this.loadingService.unset();
                this.modalService.close();
                this.router.navigate(["/"]);

                // Push updates so the notes list updates
                this.apiService.pushUpdates();
                this.notificationService.add({
                    Title: "Notebook Added",
                    Body : "Notebook with the name " + this.formData.Name + " has been added successfully.",
                    Type : "success"
                })
            }, error => {
                error.error.messages.forEach(message => {
                    this.notificationService.add({
                        Title: "Failed To Add Notebook",
                        Body : message,
                        Type : "error"
                    });
                });
                this.loadingService.unset();
            });
    }

    // Updates the highlight color for category chooser on change
    categoryChanged(){
        let catColor = this.categories.filter(cat => {
            return this.formData.Category === cat.Name
        });

        
        this.currentCategoryColor = catColor[0].Color;
    }

}
