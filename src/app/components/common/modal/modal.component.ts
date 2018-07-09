import { Component, OnInit, ViewChild, ComponentFactoryResolver, ElementRef } from '@angular/core';
import { ModalService } from '../../../services/modal.service';
import { ModalDirective } from '../../../directives/modal.directive';
import { AddNoteComponent } from '../../dialogs/add-note/add-note.component';
import { BehaviorSubject } from 'rxjs';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

    @ViewChild(ModalDirective) modalHost: ModalDirective;

    componentChangeObserver: BehaviorSubject<any>;

    constructor(public modalService: ModalService,
        public componentFactoryResolver: ComponentFactoryResolver) {

        // Get the component listener and assign it
        this.componentChangeObserver = this.modalService.getComponentChanger();
    }

    ngOnInit() {
        this.renderComponent(AddNoteComponent);

        // Subscribe to component changes and show them
        this.componentChangeObserver.subscribe(component => {
            this.renderComponent(component);
        })
    }

    renderComponent(component: any) {
        // Create a component factory
        let componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        // Get referemce to the view copmponent host
        let viewComponentRef = this.modalHost.viewContainerRef;
        viewComponentRef.clear();

        // Render component
        let componentRef = viewComponentRef.createComponent(componentFactory);

    }

}
