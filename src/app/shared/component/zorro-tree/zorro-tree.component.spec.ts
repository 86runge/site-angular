import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZorroTreeComponent } from './zorro-tree.component';

describe('ZorroTreeComponent', () => {
  let component: ZorroTreeComponent;
  let fixture: ComponentFixture<ZorroTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZorroTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZorroTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
