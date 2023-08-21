import {Component, EventEmitter, Input, Output} from '@angular/core';

import {Priority} from "../priority";
import {Card} from "../card";
import {EditCardComponent} from "../edit-card/edit-card.component";
import {PriorityService} from "../priority.service";
import {CardService} from "../card.service";
import {AppComponent} from "../app.component";
import {StatusService} from "../status.service";
import {GridLayoutComponent} from "../grid-layout/grid-layout.component";
import {DataService} from "../db.service";

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
              private statusService:StatusService,
              private dataService:DataService) {
  }

  openWindow() {
    this.appComponent.inCardEdit = this.card;
    new EditCardComponent(this.priorityService, this.statusService, this.appComponent,this.cardService, this.dataService).openWindow();
  }

  protected readonly EditCardComponent = EditCardComponent;
}


