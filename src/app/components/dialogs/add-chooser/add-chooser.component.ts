import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { AddNoteComponent } from '../add-note/add-note.component';

@Component({
    selector: 'app-add-chooser',
    templateUrl: './add-chooser.component.html',
    styleUrls: ['./add-chooser.component.scss']
})
export class AddChooserComponent implements OnInit {

    constructor(public modalService: ModalService) { }

    ngOnInit() {
    }

    // Open modal
    openModal(name: string){
        switch (name) {
            case "add-category":
                this.modalService.show("Add Category", AddCategoryComponent)
                break;
            case "add-notebook":
                this.modalService.show("Add Notebook", AddNoteComponent)
                break;
            default:
                break;
        }
    }

}
