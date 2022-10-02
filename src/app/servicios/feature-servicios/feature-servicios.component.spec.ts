import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureServiciosComponent } from './feature-servicios.component';

describe('FeatureServiciosComponent', () => {
  let component: FeatureServiciosComponent;
  let fixture: ComponentFixture<FeatureServiciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureServiciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
