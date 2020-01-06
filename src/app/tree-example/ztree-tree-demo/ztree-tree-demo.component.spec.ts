import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZtreeTreeDemoComponent } from './ztree-tree-demo.component';

describe('ZtreeTreeDemoComponent', () => {
  let component: ZtreeTreeDemoComponent;
  let fixture: ComponentFixture<ZtreeTreeDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZtreeTreeDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZtreeTreeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
