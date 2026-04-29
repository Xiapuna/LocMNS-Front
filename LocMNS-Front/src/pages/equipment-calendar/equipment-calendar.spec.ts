import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentCalendar } from './equipment-calendar';

describe('EquipmentCalendar', () => {
  let component: EquipmentCalendar;
  let fixture: ComponentFixture<EquipmentCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentCalendar],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentCalendar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
