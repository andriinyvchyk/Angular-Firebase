import { TestBed } from '@angular/core/testing';

import { NewProductService } from './new-product.service';

describe('NewProductService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewProductService = TestBed.get(NewProductService);
    expect(service).toBeTruthy();
  });
});
