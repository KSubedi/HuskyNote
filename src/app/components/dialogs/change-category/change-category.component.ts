import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { ApiService } from '../../../services/api.service';
import { NotificationService } from '../../../services/notification.service';
import { StateService } from '../../../services/state.service';
import { ModalService } from '../../../services/modal.service';

@Component({
    selector: 'app-change-category',
    templateUrl: './change-category.component.html',
    styleUrls: ['./change-category.component.scss']
})
export class ChangeCategoryComponent implements OnInit {

    categories: Array<Category> = [];

    constructor(public apiService: ApiService,
                public notificationService: NotificationService,
                public stateService: StateService,
                public modalService: ModalService) {
    }

    ngOnInit() {
        this.apiService.getCategories().subscribe(categories => {
            this.categories = categories;
        }, error => {
            this.notificationService.add({
                Title: "Load Failed",
                Body: "Could not load categories. Please try again!",
                Type: "error"
            });
        });
    }

    changeCategory(cat: Category){
        this.stateService.currentCategory = cat;
        this.modalService.close();
        this.apiService.pushUpdates();
    }

}
