import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentInfo } from './equipment-info';

describe('InfoEquipment', () => {
  let component: EquipmentInfo;
  let fixture: ComponentFixture<EquipmentInfo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipmentInfo],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipmentInfo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
