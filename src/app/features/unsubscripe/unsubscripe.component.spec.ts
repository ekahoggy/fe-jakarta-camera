import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscripeComponent } from './unsubscripe.component';

describe('UnsubscripeComponent', () => {
  let component: UnsubscripeComponent;
  let fixture: ComponentFixture<UnsubscripeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnsubscripeComponent]
    });
    fixture = TestBed.createComponent(UnsubscripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
