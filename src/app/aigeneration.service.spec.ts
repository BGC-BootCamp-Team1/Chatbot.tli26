import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AIGenerationService } from './aigeneration.service';
import { environment } from '../environments/environment';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

interface TextGenerationResponse {
  output: {
    choices: {
      message: {
        content: string;
      };
    }[];
  };
}

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

  it('should generate content and return only the content field', () => {
    const inputText = 'Give me a suggestion for a music instrument.';
    const mockResponse: TextGenerationResponse = {
      output: {
        choices: [
          {
            message: {
              content: 'How about the piano?'
            }
          }
        ]
      }
    };
    service.generateContent(inputText).subscribe(content => {
      expect(content).toEqual('How about the piano?');
    });
    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service['apiKey']}`);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');

    req.flush(mockResponse);
  });

  it('should return first instrument name', () => {
    expect(service.findFirstInstrument('她会弹钢琴和吉他')).toBe('钢琴')
  });

  it('should return null if no instrument is found', () => {
    const text = '我觉得画画不错';
    const instrument = service.findFirstInstrument(text);
    expect(instrument).toBeNull();
  });
  
  it('should generate a random number', () => {
    const randomNum = service['getRandomNum']();
    expect(randomNum).toBeLessThan(2 ** 32);
  });
});
