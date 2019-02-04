import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignBookComponent } from './assign-book.component';

describe('AssignBookComponent', () => {
  let component: AssignBookComponent;
  let fixture: ComponentFixture<AssignBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
