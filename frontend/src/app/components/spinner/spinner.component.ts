// loading-spinner.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template:
    '<div class="spinner-border" role="status"><span class="sr-only"></span></div>',
  styles: ['.spinner-border { width: 1rem; height: 1rem; }'],
})
export class LoadingSpinnerComponent {}
