import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentBooking } from './equipment-booking';

describe('EquipmentBooking', () => {
  let component: EquipmentBooking;
  let fixture: ComponentFixture<EquipmentBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentBooking],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentBooking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
