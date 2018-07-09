import { Directive, ElementRef } from '@angular/core';

@Directive({
	selector: '[appDialog]'
})
export class DialogDirective {

	// Holds element and parent element
	element: HTMLElement;
	parent: HTMLElement;

	// Holds the cursor offset
	cursorOffsetX = 0;
	cursorOffsetY = 0;

	constructor(public elementRef: ElementRef) {
		this.makeDraggable(elementRef.nativeElement);
	}

	private makeDraggable(element: HTMLElement) {
		// Assign the elements
		this.element = element;
		this.parent = element.parentElement;

		// Make it draggable
        this.element.draggable = true;
        
        // Add css transition so that the window scrolls smoothly
        // this.element.style.transition = "all 0.3s ease";

		// Prevent default browser actions
		this.parent.ondragover = event => this.preventDefault(event);

		// Calculate cursor offsets on drag start
		this.parent.ondragstart = event => this.calculateOffsets(event);

		// Handle and move element when dropped
		this.parent.ondrop = event => this.handleDrop(event);

	}


	// Prevent default actions on events
	preventDefault(event: DragEvent) {
		event.stopPropagation();
		event.preventDefault();
		return false;
	}

	calculateOffsets(event: DragEvent) {
		const cRect = this.element.getBoundingClientRect();

		// When the drag starts, calculate the position of cursor vs position of the element
		// so we can set the coordinates for the top left corner of the element later.
		this.cursorOffsetX = event.pageX - cRect.left;
		this.cursorOffsetY = event.pageY - cRect.top;
		
	}

	handleDrop(event: DragEvent) {
		// Set the positions
		this.element.style.position = "absolute";

		// Calculate coordinates for top left corner of the element
		// by subtracting the cursor offset to the drop position
		let topPx: number = (event.pageY - this.cursorOffsetY);
		let leftPx: number = (event.pageX - this.cursorOffsetX);

		// If the top left corner of the element goes out of bounds, 
		// reset them to 0
		if (topPx < 0) { topPx = 0; }
		if (leftPx < 0) { leftPx = 0; }


		// If the bottom right corner of the element is out of bound,
		// calculate the new position to make sure element stays within bounds
		if ((leftPx + this.element.offsetWidth) > this.parent.offsetWidth) {
			leftPx -= leftPx + this.element.offsetWidth - this.parent.offsetWidth;
		}
		if ((topPx + this.element.offsetHeight) > this.parent.offsetHeight) {
			topPx -= topPx + this.element.offsetHeight - this.parent.offsetHeight;
		}

		// Set the coordinates
		this.element.style.top = topPx + "px";
        this.element.style.left = leftPx + "px";
	}

}
