import { TestBed } from '@angular/core/testing';

import { InvernaderoService } from './invernadero.service';

describe('InvernaderoService', () => {
  let service: InvernaderoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvernaderoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
