import { TestBed } from '@angular/core/testing';

import { ItemOptionService } from './item-option.service';

describe('ItemOptionService', () => {
  let service: ItemOptionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemOptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
