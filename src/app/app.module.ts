import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { CardComponent } from './card/card.component';

import { HeaderComponent } from "./header/header.component";
import { GridLayoutComponent } from './grid-layout/grid-layout.component';
import { EditCardComponent } from './edit-card/edit-card.component';
import { PriorityComponent } from './priority/priority.component';


@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    GridLayoutComponent,
    EditCardComponent,
    PriorityComponent

  ],
  imports: [
    BrowserModule,
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
