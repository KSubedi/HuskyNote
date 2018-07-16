import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { ApiService } from '../../../services/api.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalService } from '../../../services/modal.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

    category: Category;

    constructor(public apiService: ApiService,
    public loadingService: LoadingService,
    public modalService: ModalService,
    public notificationService: NotificationService) {
        this.category = new Category();
        this.category.Color = "blue";
        this.category.Description = "";
        this.category.Name = "";
    }

    ngOnInit() {
    }

    // Handle form submit
    submit() {
        this.loadingService.set("", false);

        // Call api
        this.apiService.addCategory(this.category).subscribe(response => {
            this.loadingService.unset();
            this.modalService.close();
            this.notificationService.add({
                Title: "Category Added",
                Body: "Category with the name " + this.category.Name + " has been added.",
                Type: "success"
            })
        }, error => {
            error.error.messages.forEach(message => {
                this.notificationService.add({
                    Title: "Failed To Add Category",
                    Body: message,
                    Type: "error"
                });
            });
            this.loadingService.unset();
        })
    }

}
