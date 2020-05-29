import { TestBed } from '@angular/core/testing';

import { UserlogsService } from './userlogs.service';

describe('UserlogsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserlogsService = TestBed.get(UserlogsService);
    expect(service).toBeTruthy();
  });
});
