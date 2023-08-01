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
import { StatusColumnComponent } from './status-column/status-column.component';
import { EditStatusComponent } from './edit-status/edit-status.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    GridLayoutComponent,
    StatusComponent,
    CardInputComponent,
    EditCardComponent,
    PriorityComponent,
    StatusColumnComponent,
    EditStatusComponent
  ],
  imports: [
    BrowserModule,
    HeaderComponent,
    FormsModule
  ],
  providers: [CardService],
  bootstrap: [AppComponent]
})
export class AppModule {}
