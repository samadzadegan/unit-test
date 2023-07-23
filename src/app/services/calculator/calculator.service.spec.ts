import { TestBed } from '@angular/core/testing';
import { CalculatorService } from './calculator.service';
import { LoggerService } from '../logger/logger.service';

describe('CalculatorService', () => {
  let service: CalculatorService;
  let mockLoggerService: any;

  beforeEach(() => {
    mockLoggerService = jasmine.createSpyObj('LoggerService', ['log']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    });
    service = TestBed.inject(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add two numbers', () => {
    // pending();
    // fail();
    let result = service.add(2, 2);
    expect(result).toBe(4);
    expect(mockLoggerService.log).toHaveBeenCalledTimes(1);
  });

  it('should subtract two numbers', () => {
    let result = service.subtract(2, 2);
    expect(result).toBe(0);
  });
});
