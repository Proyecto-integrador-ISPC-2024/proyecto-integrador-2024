import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartResumeComponent } from './cart-resume.component';

describe('CartResumeComponent', () => {
  let component: CartResumeComponent;
  let fixture: ComponentFixture<CartResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartResumeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
