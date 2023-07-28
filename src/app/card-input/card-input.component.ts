import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.css']
})

export class CardInputComponent {
  @Input() columnIndex: number = 0;
  @Output() addCardToColumn = new EventEmitter<{columnIndex:number; title:string; content:string}>();
  title: string = '';
  content: string = '';

  addNewCard() {
    this.addCardToColumn.emit({columnIndex: this.columnIndex, title:this.title, content:this.content});
  }
}
