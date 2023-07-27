import { Component, Input } from '@angular/core';
import {Priority} from "../priority";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() id:number = 0;
  @Input() title:string = "";
  @Input() priority!:Priority;
}
