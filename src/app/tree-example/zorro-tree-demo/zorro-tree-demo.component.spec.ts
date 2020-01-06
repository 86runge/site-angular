import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZorroTreeDemoComponent } from './zorro-tree-demo.component';

describe('ZorroTreeDemoComponent', () => {
  let component: ZorroTreeDemoComponent;
  let fixture: ComponentFixture<ZorroTreeDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZorroTreeDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZorroTreeDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
