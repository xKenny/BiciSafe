import { TestBed } from '@angular/core/testing';

import { BiciResolverService } from './bici-resolver.service';

describe('BiciResolverService', () => {
  let service: BiciResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BiciResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
