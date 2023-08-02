import {Component, ElementRef, ViewChild} from '@angular/core';
import {Card} from "../card";
import {CardService} from "../card.service";
import {PriorityService} from "../priority.service";
import {of} from "rxjs";
import {Priority} from "../priority";
import {AppComponent} from "../app.component";
import {Status} from "../status";
import {StatusService} from "../status.service";

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent{
  @ViewChild('modalElement') modalelement!:ElementRef;

  card!:Card;
  closeWindow() {
    this.modalelement.nativeElement.style.display = "none";
    this.tmpDescription = null;
    this.tmpTitel = null;
    this.tmpPriority = null;
    this.tmpStatus = null;

  }

  protected readonly of = of;

  constructor(public priorityService:PriorityService,
              public statusService:StatusService,
              private appComponent:AppComponent,
              private cardService:CardService) {

    this.card = appComponent.inCardEdit;
    console.log("constructor: ");
    console.log(appComponent.inCardEdit);
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
      return  this.appComponent.inCardEdit.status;
    }
  }

  //gibt die Beschreibung des Originals bzw. der Temporären ungespeicherten Card zurück
  public GetDescription():string {
    let desc: string = "";
    if (this.tmpDescription != null && this.tmpDescription.length > 0) {
      desc = this.tmpDescription!;
    }else if(this.appComponent.inCardEdit.description.length > 0) {
      desc = this.appComponent.inCardEdit.description;
    }

    return desc;
  }

  //gibt die ID der Card zurück, die editiert wird
  public GetId():number {
    return  this.appComponent.inCardEdit.id;
  }

  //öffnet den input zum Titel edit
  openEditTitle() {
    this.closeSelection()
    this.editTitle = true;
  }

  //speichert den geänderten Titel temporär ab
  saveTmpTitle() {
    if (typeof (<HTMLInputElement>document.getElementById("titleinput")).value) {
      this.tmpTitel = (<HTMLInputElement>document.getElementById("titleinput")).value;
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
    var saveCard:Card = {title:this.GetTitle(), priority:this.GetPriority(),description:this.GetDescription(),id:this.GetId(), status: this.GetStatus()};
    this.cardService.setCard(saveCard)
    console.log(saveCard);
    this.closeSelection()
    this.closeWindow();
  }

  //löscht die Card
  delete() {
    this.cardService.deleteCard(this.GetId());
    this.closeWindow();
  }
}
