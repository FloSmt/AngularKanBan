import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Status} from "../status";
import {StatusService} from "../status.service";

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.css']
})

export class CardInputComponent {
  @Output() addCardToColumn = new EventEmitter<{status:Status; title:string; content:string}>();
  title: string = '';
  content: string = '';

  constructor(private statusService:StatusService) {
  }


  addNewCard() {
    this.addCardToColumn.emit({status: this.statusService.getStatus(0), title:this.title, content:this.content});
  }
}
