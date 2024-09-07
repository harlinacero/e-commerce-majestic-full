import { TestBed } from '@angular/core/testing';

import { ShopingCarServiceService } from './shoping-car-service.service';

describe('ShopingCarServiceService', () => {
  let service: ShopingCarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShopingCarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
