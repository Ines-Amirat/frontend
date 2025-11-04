import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalBalanceBoxComponent } from './total-balance-box.component';

describe('TotalBalanceBoxComponent', () => {
  let component: TotalBalanceBoxComponent;
  let fixture: ComponentFixture<TotalBalanceBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalBalanceBoxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalBalanceBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
