import {Component, ElementRef, ViewChild} from '@angular/core';
import {Card} from "../card";
import {CardService} from "../card.service";
import {PriorityService} from "../priority.service";
import {of} from "rxjs";
import {Priority} from "../priority";
import {AppComponent} from "../app.component";
import {Status} from "../status";
import {StatusService} from "../status.service";
import {DataService} from "../db.service";

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent {
  @ViewChild('modalElement') modalelement!:ElementRef;

  card!:Card;

  closeWindow() {
    this.modalelement.nativeElement.style.display = "none";
    this.modalelement.nativeElement.style.visibility = "hidden";
    this.tmpDescription = null;
    this.tmpTitel = null;
    this.tmpPriority = null;
    this.tmpStatus = null;
  }

  protected readonly of = of;

  constructor(public priorityService:PriorityService,
              public statusService:StatusService,
              private appComponent:AppComponent,
              private cardService:CardService,
              private dataService: DataService) {

    this.card = appComponent.inCardEdit;
  }

  editTitle:boolean = false;
  editDescription:boolean = false;
  prioritySelect:boolean = true;
  statusSelect:boolean = true;

  //Temp. Changes (Placeholder)
  tmpTitel!:string | null;
  tmpDescription!:string | null;
  tmpPriority!:Priority | null;
  tmpStatus!:Status | null;


  //öffnet das Editor menu für die aktuelle Card
  openWindow() {
    const modalElement = document.getElementById('modalElement');
    if (modalElement) {
      modalElement.style.display = 'flex';
      modalElement.style.visibility = 'visible';
    }
  }

  openEditPriorityWindow() {
    this.closeSelection();
    const modalElement = document.getElementById('editpriority');
    if (modalElement) {
      modalElement.style.display = 'flex';
    }
  }

  //gibt den Titel des Originals bzw. der Temporären ungespeicherten Card zurück
  public GetTitle():string {
    if (this.tmpTitel) {
      return this.tmpTitel
    }else {
      return  this.appComponent.inCardEdit.title;
    }
  }

  //gibt die Priorität des Originals bzw. der Temporären ungespeicherten Card zurück
  public GetPriority():Priority {
    if (this.tmpPriority) {
      return this.tmpPriority;
    }else {
      return  this.appComponent.inCardEdit.priority;
    }
  }

  //gibt den Status des Originals bzw. der Temporären ungespeicherten Card zurück
  public GetStatus():Status {
    if (this.tmpStatus) {
      return this.tmpStatus;
    }else {
      return this.appComponent.inCardEdit.status as Status;
    }
  }

  //gibt die Beschreibung des Originals bzw. der Temporären ungespeicherten Card zurück
  public GetDescription():string {
    let desc: string = "";
    if (this.tmpDescription != null && this.tmpDescription.length > 0) {
      desc = this.tmpDescription!;
    }else if(this.appComponent.inCardEdit.description && this.appComponent.inCardEdit.description.length > 0) {
      desc = this.appComponent.inCardEdit.description;
    }

    return desc;
  }

  //gibt die ID der Card zurück, die editiert wird
  public GetId():number {
    return  this.appComponent.inCardEdit.id;
  }

  public GetCreateDate():Date {
    return  this.appComponent.inCardEdit.created;
  }

  public GetEditedDate():Date | null {
    return  this.appComponent.inCardEdit.edited;
  }

  time_ago(time:any) {

    switch (typeof time) {
      case 'number':
        break;
      case 'string':
        time = +new Date(time);
        break;
      case 'object':
        if (time instanceof Date) time = time.getTime();
        break;
      default:
        time = +new Date();
    }
    var time_formats = [
      [60, 'seconds', 1], // 60
      [120, '1 minute ago', '1 minute from now'], // 60*2
      [3600, 'minutes', 60], // 60*60, 60
      [7200, '1 hour ago', '1 hour from now'], // 60*60*2
      [86400, 'hours', 3600], // 60*60*24, 60*60
      [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2
      [604800, 'days', 86400], // 60*60*24*7, 60*60*24
      [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2
      [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7
      [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2
      [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
      [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2
      [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
      [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2
      [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
    ];
    var seconds = (+new Date() - time) / 1000,
      token = 'ago',
      list_choice = 1;

    if (seconds < 0) {
      seconds = Math.abs(seconds);
      token = 'from now';
      list_choice = 2;
    }
    var i = 0,
      format;
    while (format = time_formats[i++])
      { // @ts-ignore
        if (seconds < format[0]) {
                if (typeof format[2] == 'string')
                  return format[list_choice];
                else
                  return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;
              }
      }
    return time;
  }


  //öffnet den input zum Titel edit
  openEditTitle() {
    this.closeSelection()
    this.editTitle = true;
  }

  checkTitleInput() {
    if ((<HTMLInputElement>document.getElementById("titleinput")).value.length < 3) {
      document.getElementById("titleinput")!.classList.add("error");
    }else {
      document.getElementById("titleinput")!.classList.remove("error");

    }
  }

  //speichert den geänderten Titel temporär ab
  saveTmpTitle() {
    if (typeof (<HTMLInputElement>document.getElementById("titleinput")).value) {
      if ((<HTMLInputElement>document.getElementById("titleinput")).value.length >= 3){
        this.tmpTitel = (<HTMLInputElement>document.getElementById("titleinput")).value;
      }
    }

    this.closeSelection();
  }

  //speichert die geänderte Beschreibung temporär ab
  saveTmpDescription() {
    this.tmpDescription = (<HTMLInputElement>document.getElementById("descriptioninput")).value;

    this.closeSelection();
  }

  //öffnet den input, um die Beschreibung zu ändern
  openEditDescription() {
    this.closeSelection()
    this.editDescription = true;
  }

  //öffnet das Prioritätselectionmenu
  openPrioritySelection() {
    this.closeSelection();
   this.prioritySelect = false;
  }
  //öffnet das Statusselectionmenu
  openStatusSelection() {
    this.closeSelection();
    this.statusSelect = false;
  }

  //schließt alle selections/inputs
  closeSelection() {
    if (!this.prioritySelect || !this.statusSelect || this.editTitle || this.editDescription) {
      this.prioritySelect = true;
      this.statusSelect = true;
      this.editTitle = false;
      this.editDescription = false;
    }
  }

  //speichert eine ausgewählte Priorität temporär ab
  selectPriority(priority:Priority) {
    this.tmpPriority = priority;
    this.closeSelection();
  }

  //speichert einen ausgewählten Status temporär ab
  selectStatus(status:Status) {
    this.tmpStatus = status;
    this.closeSelection();
  }

  //übernimmt alle temporären änderungen in die card
  save() {
    this.closeSelection();
    const saveCard: Card = {title: this.GetTitle(), priority: this.GetPriority(), description: this.GetDescription(), id: this.GetId(), status: this.GetStatus(), created: this.GetCreateDate(), edited: this.card.edited};
    this.cardService.setCard(saveCard);
    this.closeWindow();

    //änderung in db speichern
    this.updateCardInDb(this.GetId(),this.GetTitle(),this.GetStatus().id, this.GetPriority().id, this.GetDescription(), this.GetEditedDate());
  }

  //löscht die Card
  delete() {
    this.cardService.deleteCard(this.GetId());
    this.closeWindow();

    //datenbankeintrag löschen
    this.deleteCardinDb(this.GetId());
  }

  private updateCardInDb(cardId: number, title: string, newStatusId: number, priorityId: number, description: string, edited: Date | null) {
    this.dataService.updateCardInDb(cardId, title, newStatusId, priorityId, description, edited).subscribe(
      response => {
        console.log('Card successfully updated in database');
      }, error => {
        console.error('Error updating card: ', error);
      }
    )
  }

  private deleteCardinDb(id:number) {
    this.dataService.deleteCardinDb(id).subscribe(
      response => {
        console.log('Card successfully deleted');
      }, error => {
        console.log('Error deleting card: ', error);
      }
    )
  }
}
