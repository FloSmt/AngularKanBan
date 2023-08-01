import {Component, Input} from '@angular/core';
import {Status} from "../status";
import {Priority} from "../priority";
import {StatusService} from "../status.service";

@Component({
  selector: 'app-edit-status',
  templateUrl: './edit-status.component.html',
  styleUrls: ['./edit-status.component.css']
})
export class EditStatusComponent {

  @Input() status!:Status;

  constructor(private statusService:StatusService) {
  }


  closeEdit() {
    document.getElementById(this.status.id.toString())!.style.display = "none";
  }

  editTitle:boolean = false;

  //Temp. Changes (Placeholder)
  tmpTitel!:string | null;
  tmpColor!:string | null;
  tmpLimit!:boolean | null;
  tmpLimitMax!:number  | null;


  public GetTitle():string {
    if (this.tmpTitel) {
      return this.tmpTitel;
    }else {
      return this.status.title;
    }
  }

  public GetColor():string {
    if (this.tmpColor) {
      return this.tmpColor;
    }else {
      return this.status.color;
    }
  }

  public GetLimit():boolean {
    if (this.tmpLimit != null) {
      return this.tmpLimit;
    }else {
      return this.status.limit;
    }
  }

  public GetMax():number {
    if (this.tmpLimitMax) {
      return this.tmpLimitMax;
    }else {
      return this.status.max;
    }

  }

  public GetID():number {
    return this.status.id;
  }

  openEditTitle() {
    this.editTitle = true;
  }

  saveTmpTitle() {
    if (typeof (<HTMLInputElement>document.getElementById("titleinput")).value) {
      this.tmpTitel = (<HTMLInputElement>document.getElementById("titleinput")).value;
    }

    this.editTitle = false;
  }

  save() {
    this.statusService.setStatus({id:this.GetID(),title:this.GetTitle(),color:this.GetColor(),limit:this.GetLimit(),max:this.GetMax()})
    this.closeEdit();
  }
}
