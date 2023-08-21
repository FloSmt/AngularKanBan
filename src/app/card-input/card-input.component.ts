import { Component, Input, Output, EventEmitter } from '@angular/core';
import {DataService} from "../db.service";
import {StatusService} from "../status.service";

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.css']
})

export class CardInputComponent {
  @Input() id!: string;
  @Input() color! : string;
  @Output() addCardToColumn = new EventEmitter<{id:string; title: string; content: string }>();
  title: string = '';
  content: string = '';

  constructor(private dbService : DataService, private statusService : StatusService) {
  }

  addNewCard() {
    const minLength:number = 3;
    if(this.title.length >= minLength) {
      this.addCardToColumn.emit({id: this.id, title: this.title, content: this.content});
    }else {
      alert("Sie müssen mindestens 3 Zeichen eingeben!")
    }
  }
}
