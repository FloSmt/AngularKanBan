import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPriorityDivComponent } from './edit-priority-div.component';

describe('EditPriorityDivComponent', () => {
  let component: EditPriorityDivComponent;
  let fixture: ComponentFixture<EditPriorityDivComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPriorityDivComponent]
    });
    fixture = TestBed.createComponent(EditPriorityDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
