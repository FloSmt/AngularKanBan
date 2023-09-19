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
  @Input() disabled! : boolean;

  @Output() addCardToColumn = new EventEmitter<{id:string; title: string; content: string }>();
  title: string = '';

  addNewCard() {
    const minLength:number = 3;
    if((this.title.length >= minLength) && !this.disabled) {
      this.addCardToColumn.emit({id: this.id, title: this.title, content: ""});
    }else {
      alert("Sie müssen mindestens 3 Zeichen eingeben!")
    }
  }
}
