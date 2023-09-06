import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Priority} from "../priority";

@Component({
  selector: 'app-edit-priority-div',
  templateUrl: './edit-priority-div.component.html',
  styleUrls: ['./edit-priority-div.component.css']
})
export class EditPriorityDivComponent {
  @Input() priority!:Priority;

  @Output("deleteFct") deleteFct: EventEmitter<any> = new EventEmitter<any>();

  delete() {
    this.deleteFct.emit();
  }

  checkNameInput() {
    if ((<HTMLInputElement>document.getElementById(this.priority.id + "_priority_name")).value.length < 3) {
      document.getElementById(this.priority.id + "_priority_name")!.classList.add("error");
    }else {
      document.getElementById(this.priority.id + "_priority_name")!.classList.remove("error");
    }
  }

}
