import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInputComponent } from './card-input.component';
import {createComponent} from "@angular/core";

describe('CardInputComponent', () => {
  let component: CardInputComponent;
  let fixture: ComponentFixture<CardInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardInputComponent]
    });
    fixture = TestBed.createComponent(CardInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
