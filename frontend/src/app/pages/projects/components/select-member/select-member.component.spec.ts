import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectMemberComponent } from './select-member.component';

describe('SelectMemberComponent', () => {
  let component: SelectMemberComponent;
  let fixture: ComponentFixture<SelectMemberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectMemberComponent]
    });
    fixture = TestBed.createComponent(SelectMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
