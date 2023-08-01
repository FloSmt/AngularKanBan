import {Component, Input} from '@angular/core';
import {CardService} from "../card.service";
import {StatusService} from "../status.service";
import {Status} from "../status";

@Component({
  selector: 'app-status-column',
  templateUrl: './status-column.component.html',
  styleUrls: ['./status-column.component.css']
})
export class StatusColumnComponent {

  @Input() status!:Status;

  constructor(public cardService:CardService, public statusService:StatusService) {
  }

  getColor(status:Status):string {
    if (this.cardService.getCardsWithStatus(status).length > status.max) {
      return "#f83000";
    }else {
      return "#9f9f9f";
    }
  }

  openEdit() {
    const statusedit = document.getElementById(this.status.id.toString());
    if (statusedit) {
      statusedit.style.display = 'flex';
    }
  }
}
