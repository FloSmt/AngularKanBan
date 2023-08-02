import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CardComponent } from './card/card.component';

import { HeaderComponent } from "./header/header.component";
import { GridLayoutComponent } from './grid-layout/grid-layout.component';
import { StatusComponent } from './status/status.component';
import { CardInputComponent } from './card-input/card-input.component';
import {FormsModule} from "@angular/forms";
import {CardService} from "./card.service";
import { EditCardComponent } from './edit-card/edit-card.component';
import { PriorityComponent } from './priority/priority.component';
import {CdkDrag, CdkDropList, CdkDropListGroup} from "@angular/cdk/drag-drop";


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    GridLayoutComponent,
    StatusComponent,
    CardInputComponent,
    EditCardComponent,
    PriorityComponent
  ],
  imports: [
    BrowserModule,
    HeaderComponent,
    FormsModule,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
