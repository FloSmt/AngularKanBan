import { Component } from '@angular/core';
import {CardService} from "../card.service";
import {PriorityService} from "../priority.service";

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})
export class GridLayoutComponent {

  protected readonly CardService = CardService;
  protected readonly PriorityService = PriorityService;

  constructor(public cardService:CardService) {
  }
}
