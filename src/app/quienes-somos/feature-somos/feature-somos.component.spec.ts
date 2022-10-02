import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeatureSomosComponent } from './feature-somos.component';

describe('FeatureSomosComponent', () => {
  let component: FeatureSomosComponent;
  let fixture: ComponentFixture<FeatureSomosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeatureSomosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeatureSomosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
