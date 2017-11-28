import { TestBed, inject } from '@angular/core/testing';

import { ConsultingService } from './consulting.service';

describe('ConsultingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultingService]
    });
  });

  it('should be created', inject([ConsultingService], (service: ConsultingService) => {
    expect(service).toBeTruthy();
  }));
});
