import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSuggestComponent } from './products-suggest.component';

describe('ProductsSuggestComponent', () => {
  let component: ProductsSuggestComponent;
  let fixture: ComponentFixture<ProductsSuggestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsSuggestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductsSuggestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
