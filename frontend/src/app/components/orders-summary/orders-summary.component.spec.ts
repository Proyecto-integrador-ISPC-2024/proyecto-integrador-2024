import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersSummaryComponent } from './orders-summary.component';

describe('OrdersSummaryComponent', () => {
  let component: OrdersSummaryComponent;
  let fixture: ComponentFixture<OrdersSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrdersSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
