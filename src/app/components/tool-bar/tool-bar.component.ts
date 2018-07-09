import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { AddNoteComponent } from '../dialogs/add-note/add-note.component';
import { AddChooserComponent } from '../dialogs/add-chooser/add-chooser.component';

@Component({
    selector: 'app-tool-bar',
    templateUrl: './tool-bar.component.html',
    styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {

    constructor(public modalService: ModalService) { }

    ngOnInit() {
    }

    openModal(name: string){
        switch(name){
            case "add-note":
                this.modalService.show("Add Note", AddNoteComponent);
                break;
            case "add-new":
                this.modalService.show("Add New", AddChooserComponent);
            default:
                break;
        }
    }
}
