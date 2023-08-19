import { TestBed } from '@angular/core/testing';

import { TimeColorService } from './time-color.service';

describe('TimeColorService', () => {
  let service: TimeColorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeColorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
