import { Component, Input, Output, EventEmitter } from '@angular/core';
import {StatusService} from "../status.service";

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.css']
})

export class CardInputComponent {
  @Input() id!: string;
  @Output() addCardToColumn = new EventEmitter<{id:string; title: string; content: string }>();
  title: string = '';
  content: string = '';

  addNewCard() {
    this.addCardToColumn.emit({id: this.id, title: this.title, content: this.content});
  }
}
