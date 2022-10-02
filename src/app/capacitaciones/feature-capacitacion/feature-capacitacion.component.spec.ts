import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureCapacitacionComponent } from './feature-capacitacion.component';

describe('FeatureCapacitacionComponent', () => {
  let component: FeatureCapacitacionComponent;
  let fixture: ComponentFixture<FeatureCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureCapacitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
