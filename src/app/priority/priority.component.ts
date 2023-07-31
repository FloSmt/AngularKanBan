import {Component, Input} from '@angular/core';
import {Priority} from "../priority";
import {PriorityService} from "../priority.service";

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent {
  @Input() priority!:Priority;
  protected readonly PriorityService = PriorityService;

}
