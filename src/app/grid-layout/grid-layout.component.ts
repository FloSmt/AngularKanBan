import {Component, OnInit} from '@angular/core';
import {CardService} from '../card.service';
import {PriorityService} from "../priority.service";
import {StatusService} from "../status.service";

@Component({
  selector: 'app-grid-layout',
  templateUrl: './grid-layout.component.html',
  styleUrls: ['./grid-layout.component.css']
})

export class GridLayoutComponent implements OnInit {


  constructor(public cardService: CardService, public statusService:StatusService) {

  }

  protected readonly CardService = CardService;
  protected readonly PriorityService = PriorityService;

  ngOnInit() {
    this.cardService.updateColumns();
  }
}
