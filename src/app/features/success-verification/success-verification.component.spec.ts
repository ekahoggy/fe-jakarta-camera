import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessVerificationComponent } from './success-verification.component';

describe('SuccessVerificationComponent', () => {
  let component: SuccessVerificationComponent;
  let fixture: ComponentFixture<SuccessVerificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuccessVerificationComponent]
    });
    fixture = TestBed.createComponent(SuccessVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
