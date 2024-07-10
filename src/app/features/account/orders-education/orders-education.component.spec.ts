import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersEducationComponent } from './orders-education.component';

describe('OrdersEducationComponent', () => {
  let component: OrdersEducationComponent;
  let fixture: ComponentFixture<OrdersEducationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersEducationComponent]
    });
    fixture = TestBed.createComponent(OrdersEducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
