import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOperateComponent } from './order-operate.component';

describe('OrderOperateComponent', () => {
  let component: OrderOperateComponent;
  let fixture: ComponentFixture<OrderOperateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderOperateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
