import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AIGenerationService } from './aigeneration.service';

describe('AIGenerationService', () => {
  let service: AIGenerationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AIGenerationService]
    });
    service = TestBed.inject(AIGenerationService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return first instrument name', () => {
    expect(service.findFirstInstrument('她会弹钢琴和吉他')).toBe('钢琴')
  }

  )
});
