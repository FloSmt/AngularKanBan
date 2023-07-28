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


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    GridLayoutComponent,
    StatusComponent,
    CardInputComponent

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
