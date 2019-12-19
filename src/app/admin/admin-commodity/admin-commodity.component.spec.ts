import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommodityComponent } from './admin-commodity.component';

describe('AdminCommodityComponent', () => {
  let component: AdminCommodityComponent;
  let fixture: ComponentFixture<AdminCommodityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCommodityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommodityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
