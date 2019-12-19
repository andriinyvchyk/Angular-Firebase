import { TestBed } from '@angular/core/testing';

import { BgServiceService } from './bg-service.service';

describe('BgServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BgServiceService = TestBed.get(BgServiceService);
    expect(service).toBeTruthy();
  });
});
