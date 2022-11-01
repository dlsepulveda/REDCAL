import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCapacitacionComponent } from './upload-capacitacion.component';

describe('UploadCapacitacionComponent', () => {
  let component: UploadCapacitacionComponent;
  let fixture: ComponentFixture<UploadCapacitacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadCapacitacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadCapacitacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
