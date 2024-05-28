import { TestBed } from '@angular/core/testing';

import { ModalService } from './modalstatus.service';

describe('ModalstatusService', () => {
  let service: ModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
