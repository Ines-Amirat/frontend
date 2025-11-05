import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankDropDwonComponent } from './bank-drop-dwon.component';

describe('BankDropDwonComponent', () => {
  let component: BankDropDwonComponent;
  let fixture: ComponentFixture<BankDropDwonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankDropDwonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankDropDwonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
