import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JasaFotoComponent } from './jasa-foto.component';

describe('JasaFotoComponent', () => {
  let component: JasaFotoComponent;
  let fixture: ComponentFixture<JasaFotoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JasaFotoComponent]
    });
    fixture = TestBed.createComponent(JasaFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
