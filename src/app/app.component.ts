import {Component} from '@angular/core';
import {Card} from "./card";
import {PriorityService} from "./priority.service";
import {StatusService} from "./status.service";
import {CardService} from "./card.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularKanBan';

  //Platzhalter vorlage
  inCardEdit:Card = {
    id:-1,
    title:"unknown",
    description:"unknown",
    priority: this.priorityService.getPriority(-1),
    status: this.statusService.getStatus(0),
    edited: new Date(),
    created: new Date()
  };

  constructor(public priorityService:PriorityService, public statusService:StatusService, private cardService: CardService) {
    this.cardService.loadCardsFromDatabase();
  }
}
