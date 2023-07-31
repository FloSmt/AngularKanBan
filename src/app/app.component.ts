import {Component} from '@angular/core';
import {CardComponent} from "./card/card.component";
import {CardService} from "./card.service";
import {Card} from "./card";
import {PriorityService} from "./priority.service";
import {StatusService} from "./status.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularKanBan';

  inCardEdit:Card = {id:-1,title:"unknown",description:"unknown", priority: this.priorityService.getPriority(-1), status: this.statusService.getStatus(0)};

  constructor(public priorityService:PriorityService, public statusService:StatusService) {
  }

}
