import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasangCctvComponent } from './pasang-cctv.component';

describe('PasangCctvComponent', () => {
  let component: PasangCctvComponent;
  let fixture: ComponentFixture<PasangCctvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasangCctvComponent]
    });
    fixture = TestBed.createComponent(PasangCctvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
