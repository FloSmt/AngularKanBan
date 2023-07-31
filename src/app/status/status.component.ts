// status.component.ts
import {Component, Input} from '@angular/core';
import {Status} from "../status";
import {StatusService} from "../status.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {
  @Input() status:Status = this.statusService.getStatus(0);
  constructor(private statusService:StatusService) {
  }
}
