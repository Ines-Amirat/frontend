import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentTransferFormComponent } from './payment-transfer-form.component';

describe('PaymentTransferFormComponent', () => {
  let component: PaymentTransferFormComponent;
  let fixture: ComponentFixture<PaymentTransferFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentTransferFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentTransferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
