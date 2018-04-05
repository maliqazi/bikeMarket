import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyBikeComponent } from './daily-bike.component';

describe('DailyBikeComponent', () => {
  let component: DailyBikeComponent;
  let fixture: ComponentFixture<DailyBikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyBikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
