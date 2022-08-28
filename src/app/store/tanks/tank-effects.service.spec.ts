import { TestBed } from '@angular/core/testing';

import { TankEffectsService } from './tank-effects.service';

describe('TankEffectsService', () => {
  let service: TankEffectsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TankEffectsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
