import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubscribeComponent } from './admin-subscribe.component';

describe('AdminSubscribeComponent', () => {
  let component: AdminSubscribeComponent;
  let fixture: ComponentFixture<AdminSubscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
