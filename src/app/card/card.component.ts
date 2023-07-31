import { Component, Input } from '@angular/core';

import {Priority} from "../priority";
import {Card} from "../card";
import {EditCardComponent} from "../edit-card/edit-card.component";
import {PriorityService} from "../priority.service";
import {CardService} from "../card.service";
import {AppComponent} from "../app.component";
import {StatusService} from "../status.service";
import {GridLayoutComponent} from "../grid-layout/grid-layout.component";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card!:Card;

  constructor(private priorityService:PriorityService,
              private appComponent:AppComponent,
              private cardService:CardService,
              private statusService:StatusService) {
  }

  openWindow() {
    this.appComponent.inCardEdit = this.card;
    new EditCardComponent(this.priorityService, this.statusService, this.appComponent,this.cardService).openWindow();
  }

  protected readonly EditCardComponent = EditCardComponent;
}


