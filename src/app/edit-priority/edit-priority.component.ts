import {Component, Input, ViewChild} from '@angular/core';
import {CardService} from "../card.service";
import {PriorityService} from "../priority.service";
import {StatusService} from "../status.service";
import {Priority} from "../priority";
import {EditPriorityDivComponent} from "../edit-priority-div/edit-priority-div.component";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-edit-priority',
  templateUrl: './edit-priority.component.html',
  styleUrls: ['./edit-priority.component.css']
})
export class EditPriorityComponent {

  @ViewChild(EditPriorityDivComponent) editPriorityDivComponent!:EditPriorityDivComponent;

  priorities:Priority[] = [...this.priorityService.getPriorities()];
  prioritiesAmount:number = 0;

  constructor(public cardService:CardService, public priorityService:PriorityService, public statusService:StatusService) {
  }

  closeWindow() {
    document.getElementById("editpriority")!.style.display = "none";
    this.priorities = [];
    this.priorities = [...this.priorityService.getPriorities()]
  }

  setPrioritiesAmount(amount:number) {
    this.prioritiesAmount = amount;
  }

  add() {
    let id:number = this.priorities.length+1;
    this.priorities.push({id:id, name:"unknown",color:"#000000"})
  }

  delete(priority:Priority) {
    let index:number = this.priorities.indexOf(priority);
    this.priorities.splice(index,1);
  }

  save() {
    for (let priority of this.priorities) {
      let name :string = (<HTMLInputElement>document.getElementById(priority.id + "_priority_name")!).value;
      let color :string = (<HTMLInputElement>document.getElementById(priority.id + "_priority_color")!).value;

      this.priorities.find(x => x.id == priority.id)!.color = color;
      this.priorities.find(x => x.id == priority.id)!.name = name;

      const newPriority: Priority = {id: this.priorities.find(x => x.id == priority.id)!.id, color: color, name: name};
      this.priorityService.setPriorities(newPriority);

      //Datenbankanbindung: Update würde hier 4x ausgeführt
    }
    this.closeWindow();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.priorities, event.previousIndex, event.currentIndex);
  }
}
