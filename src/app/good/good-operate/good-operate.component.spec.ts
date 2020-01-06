import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodOperateComponent } from './good-operate.component';

describe('GoodOperateComponent', () => {
  let component: GoodOperateComponent;
  let fixture: ComponentFixture<GoodOperateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodOperateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
