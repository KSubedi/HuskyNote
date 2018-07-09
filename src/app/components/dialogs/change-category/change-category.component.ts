import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category';
import { ApiService } from '../../../services/api.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
    selector: 'app-change-category',
    templateUrl: './change-category.component.html',
    styleUrls: ['./change-category.component.scss']
})
export class ChangeCategoryComponent implements OnInit {

    categories: Array<Category> = [];

    constructor(public apiService: ApiService,
                public notificationService: NotificationService) {
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

}
