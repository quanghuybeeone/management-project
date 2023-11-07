import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddnewprojectComponent } from './addnewproject.component';

describe('AddnewprojectComponent', () => {
  let component: AddnewprojectComponent;
  let fixture: ComponentFixture<AddnewprojectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddnewprojectComponent]
    });
    fixture = TestBed.createComponent(AddnewprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
