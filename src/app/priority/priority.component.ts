import {Component, Input} from '@angular/core';
import {Priority} from "../priority";

@Component({
  selector: 'app-priority',
  templateUrl: './priority.component.html',
  styleUrls: ['./priority.component.css']
})
export class PriorityComponent {
  @Input() priority!:Priority;

}
