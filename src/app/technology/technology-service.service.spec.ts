import { TestBed } from '@angular/core/testing';

import { TechnologyServiceService } from './technology-service.service';

describe('TechnologyServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TechnologyServiceService = TestBed.get(TechnologyServiceService);
    expect(service).toBeTruthy();
  });
});
