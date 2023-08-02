import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusColumnComponent } from './status-column.component';

describe('StatusColumnComponent', () => {
  let component: StatusColumnComponent;
  let fixture: ComponentFixture<StatusColumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatusColumnComponent]
    });
    fixture = TestBed.createComponent(StatusColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
