import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServisKameraComponent } from './servis-kamera.component';

describe('ServisKameraComponent', () => {
  let component: ServisKameraComponent;
  let fixture: ComponentFixture<ServisKameraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ServisKameraComponent]
    });
    fixture = TestBed.createComponent(ServisKameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
