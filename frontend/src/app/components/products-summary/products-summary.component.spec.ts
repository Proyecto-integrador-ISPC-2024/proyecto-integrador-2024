import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSummaryComponent } from './products-summary.component';

describe('ProductsSummaryComponent', () => {
  let component: ProductsSummaryComponent;
  let fixture: ComponentFixture<ProductsSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
