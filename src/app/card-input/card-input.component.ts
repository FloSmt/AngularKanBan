import { Component, Input, Output, EventEmitter } from '@angular/core';

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

  addNewCard() {
    const minLength:number = 5;

    if(this.title.length >= minLength) {
      this.addCardToColumn.emit({id: this.id, title: this.title, content: this.content});
    }else {
      alert("Sie müssen mindestens 5 Zeichen eingeben!")
    }

  }

  protected readonly status = status;
}
