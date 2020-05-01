import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListShowComponent } from './wish-list-show.component';

describe('WishListShowComponent', () => {
  let component: WishListShowComponent;
  let fixture: ComponentFixture<WishListShowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WishListShowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WishListShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
