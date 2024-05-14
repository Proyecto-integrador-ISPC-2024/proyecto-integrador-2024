import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCheckoutComponent } from './form-checkout.component';

describe('FormCheckoutComponent', () => {
  let component: FormCheckoutComponent;
  let fixture: ComponentFixture<FormCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormCheckoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
