import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeteleTaskComponent } from './detele-task.component';

describe('DeteleTaskComponent', () => {
  let component: DeteleTaskComponent;
  let fixture: ComponentFixture<DeteleTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeteleTaskComponent]
    });
    fixture = TestBed.createComponent(DeteleTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
