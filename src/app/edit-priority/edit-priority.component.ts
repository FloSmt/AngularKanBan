import {Component, ViewChild} from '@angular/core';
import {CardService} from "../card.service";
import {PriorityService} from "../priority.service";
import {StatusService} from "../status.service";
import {Priority} from "../priority";
import {EditPriorityDivComponent} from "../edit-priority-div/edit-priority-div.component";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {DataService} from "../db.service";

@Component({
  selector: 'app-edit-priority',
  templateUrl: './edit-priority.component.html',
  styleUrls: ['./edit-priority.component.css']
})
export class EditPriorityComponent {

  @ViewChild(EditPriorityDivComponent) editPriorityDivComponent!:EditPriorityDivComponent;

  prioritiesAmount:number = 0;
  deleteIds:number[] = [];

  constructor(private cardService:CardService, public priorityService:PriorityService, public statusService:StatusService, private dataService:DataService) {
    this.cardService.updateColumns();
  }

  closeWindow() {
    document.getElementById("editpriority")!.style.display = "none";
    this.deleteIds = [];
    this.priorityService.updateTmpPriorities();
  }

  setPrioritiesAmount(amount:number) {
    this.prioritiesAmount = amount;
  }

  private getNextId() :number {
    let list:Priority[] = this.priorityService.getTmpPriorities();
    list.sort(function (a:Priority, b:Priority) {return (a.id-b.id)});
    if (list.length != 0) {
      return list[list.length-1].id+1;
    }else {
      return 1;
    }
  }

  add() {
    let sortid:number = this.priorityService.getTmpPriorities().length+1;
    let id:number = this.getNextId();
    this.priorityService.getTmpPriorities().push({id:id, sortid: sortid, name:"NEW #" + id,color:"#000000"})
  }

  delete(priority:Priority) {
    let index:number = this.priorityService.getTmpPriorities().indexOf(priority);
    this.priorityService.getTmpPriorities().splice(index,1);
    this.deleteIds.push(priority.id);
  }

  save() {
    console.log(this.priorityService.getTmpPriorities());
    console.log(this.priorityService.getPriorities());

    for (const id of this.deleteIds) {
      this.deletePriorityinDb(id);
      this.priorityService.deletePriority(id);
    }


    for (let priority of this.priorityService.getTmpPriorities()) {
      let inputName = (<HTMLInputElement>document.getElementById(priority.id + "_priority_name")!);

      let name :string = inputName.value;
      let color :string = (<HTMLInputElement>document.getElementById(priority.id + "_priority_color")!).value;

      if (name.length < 3) {
        name = priority.name;
        inputName.value = name;
        inputName.classList.remove("error");
      }

      this.priorityService.getTmpPriorities().find(x => x.id == priority.id)!.color = color;
      this.priorityService.getTmpPriorities().find(x => x.id == priority.id)!.name = name;

      let id:number = priority.id;
      let sortid:number = this.priorityService.getTmpPriorities().indexOf(priority);

      //TODO: Datenbankanbindung: Update würde hier 4x ausgeführt
      if (this.priorityService.getPriorities().find(x=>x.id == priority.id)) {
        this.updatePriorityInDb(id, sortid, name, color);
      }else {
        this.saveNewPriorityInDb(id, sortid, name, color);
      }

      this.priorityService.setPriorities({id: id, sortid: sortid, name: name, color: color});
    }

    this.cardService.updateColumns();
    this.closeWindow();
  }

  private updatePriorityInDb(id:number, sortid:number, name:string, color:string) {
    this.dataService.updatePriorityInDb(id, sortid, name, color).subscribe(
      response => {
        console.log('Priority successfully updated in database');
      }, error => {
        console.error('Error updating card: ', error);
      }
    )
  }

  private deletePriorityinDb(id:number) {
    this.dataService.deletePriorityinDb(id).subscribe(
      response => {
        console.log('Priority successfully deleted');
      }, error => {
        console.log('Error deleting Priority: ', error);
      }
    )
  }

  private saveNewPriorityInDb(id:number, sortid:number, name:string, color:string) {
    this.dataService.insertNewPriority(id, sortid, name, color).subscribe(
      response => {
        console.log('Priority successfully created in database');
      }, error => {
        console.error('Error creating card: ', error);
      }
    )
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.priorityService.getTmpPriorities(), event.previousIndex, event.currentIndex);
  }
}
