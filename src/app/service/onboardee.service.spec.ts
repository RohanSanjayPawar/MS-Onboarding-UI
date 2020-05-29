import { TestBed } from '@angular/core/testing';

import { OnboardeeService } from './onboardee.service';

describe('OnboardeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OnboardeeService = TestBed.get(OnboardeeService);
    expect(service).toBeTruthy();
  });
});
