import { TestBed } from '@angular/core/testing';

import { KhottoDashboardService } from './khotto-dashboard.service';

describe('KhottoDashboardService', () => {
  let service: KhottoDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KhottoDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
