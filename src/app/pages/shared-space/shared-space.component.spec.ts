import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedSpaceComponent } from './shared-space.component';

describe('SharedSpaceComponent', () => {
  let component: SharedSpaceComponent;
  let fixture: ComponentFixture<SharedSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharedSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
