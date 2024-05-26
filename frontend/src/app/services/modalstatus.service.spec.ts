import { TestBed } from '@angular/core/testing';

import { ModalstatusService } from './modalstatus.service';

describe('ModalstatusService', () => {
  let service: ModalstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
