import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditprojectComponent } from './editproject.component';

describe('EditprojectComponent', () => {
  let component: EditprojectComponent;
  let fixture: ComponentFixture<EditprojectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditprojectComponent]
    });
    fixture = TestBed.createComponent(EditprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
