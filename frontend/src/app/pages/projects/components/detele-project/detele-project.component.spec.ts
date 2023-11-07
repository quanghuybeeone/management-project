import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeteleProjectComponent } from './detele-project.component';

describe('DeteleProjectComponent', () => {
  let component: DeteleProjectComponent;
  let fixture: ComponentFixture<DeteleProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeteleProjectComponent]
    });
    fixture = TestBed.createComponent(DeteleProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
