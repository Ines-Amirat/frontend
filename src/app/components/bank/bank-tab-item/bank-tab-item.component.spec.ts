import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankTabItemComponent } from './bank-tab-item.component';

describe('BankTabItemComponent', () => {
  let component: BankTabItemComponent;
  let fixture: ComponentFixture<BankTabItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankTabItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankTabItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
