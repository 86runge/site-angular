import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZtreeTreeComponent } from './ztree-tree.component';

describe('ZtreeTreeComponent', () => {
  let component: ZtreeTreeComponent;
  let fixture: ComponentFixture<ZtreeTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZtreeTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZtreeTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
