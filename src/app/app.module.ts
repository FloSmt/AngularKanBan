import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from "./header/header.component";
import { GridLayoutComponent } from './grid-layout/grid-layout.component';

@NgModule({
  declarations: [
    AppComponent,
    GridLayoutComponent
  ],
  imports: [
    BrowserModule,
    HeaderComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
