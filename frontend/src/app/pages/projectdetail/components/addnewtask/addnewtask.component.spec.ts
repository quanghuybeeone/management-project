import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewtaskComponent } from './addnewtask.component';

describe('AddnewtaskComponent', () => {
  let component: AddnewtaskComponent;
  let fixture: ComponentFixture<AddnewtaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewtaskComponent]
    });
    fixture = TestBed.createComponent(AddnewtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
