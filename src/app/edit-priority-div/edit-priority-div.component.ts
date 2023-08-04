import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Priority} from "../priority";

@Component({
  selector: 'app-edit-priority-div',
  templateUrl: './edit-priority-div.component.html',
  styleUrls: ['./edit-priority-div.component.css']
})
export class EditPriorityDivComponent {
  @Input() priority!:Priority;
  @Input() index!:number;

  @Output("deleteFct") deleteFct: EventEmitter<any> = new EventEmitter<any>();

  delete() {
    this.deleteFct.emit();
  }

}
