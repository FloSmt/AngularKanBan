import {Component, Input, ElementRef, ViewChild, AfterViewInit, OnInit, AfterContentInit} from '@angular/core';
import {Card} from "../card";
import {CardService} from "../card.service";
import {PriorityService} from "../priority.service";
import {of} from "rxjs";
import {Priority} from "../priority";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.css']
})
export class EditCardComponent implements AfterContentInit{
  @ViewChild('modalElement') modalelement!:ElementRef;

  card!:Card;
  closeWindow() {
    this.modalelement.nativeElement.style.display = "none";
    this.tmpDescription = null;
    this.tmpTitel = null;
    this.tmpPriority = null;

  }

  openWindow() {
    const modalElement = document.getElementById('modalElement');
    if (modalElement) {
      modalElement.style.display = 'flex';
    }
  }

  protected readonly of = of;

  constructor(public priorityService:PriorityService, private appComponent:AppComponent, private cardService:CardService) {
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


  public GetTitle():string {
    if (this.tmpTitel) {
      return this.tmpTitel
    }else {
      return  this.appComponent.inCardEdit.title;
    }
  }

  public GetPriority():Priority {
    if (this.tmpPriority) {
      return this.tmpPriority
    }else {
      return  this.appComponent.inCardEdit.priority;
    }
  }
  public GetDescription():string {
    let desc: string = "";
    if (this.tmpDescription != null && this.tmpDescription.length >= 0) {
      desc = this.tmpDescription!;
    }else {
      desc = this.appComponent.inCardEdit.description;
    }

    return desc;
  }


  public GetId():number {
    return  this.appComponent.inCardEdit.id;
  }

  openEditTitle() {
    this.closeSelection()
    this.editTitle = true;
  }

  saveTmpTitle() {
    if (typeof (<HTMLInputElement>document.getElementById("titleinput")).value) {
      this.tmpTitel = (<HTMLInputElement>document.getElementById("titleinput")).value;
    }

    this.closeSelection();
  }

  saveTmpDescription() {
    this.tmpDescription = (<HTMLInputElement>document.getElementById("descriptioninput")).value;

    this.closeSelection();
  }

  openEditDescription() {
    this.closeSelection()
    this.editDescription = true;
  }

  openPrioritySelection() {
    this.closeSelection();
   this.prioritySelect = false;
  }

  openStatusSelection() {
    this.closeSelection();
    this.statusSelect = false;
  }

  closeSelection() {
    this.prioritySelect = true;
    this.statusSelect = true;
    this.editTitle = false;
    this.editDescription = false;
  }

  selectPriority(priority:Priority) {
    this.tmpPriority = priority;
    this.closeSelection();
  }

  save() {
    this.cardService.setCard({title:this.GetTitle(), priority:this.GetPriority(),description:this.GetDescription(),id:this.appComponent.inCardEdit.id})
    this.closeSelection()
    this.closeWindow();
  }

  ngAfterContentInit():void {

  }
}
