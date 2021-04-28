import { TestBed } from '@angular/core/testing';
import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('CalculatorService', () => {
  let service: CalculatorService;
  let loggerSpy: any;

  beforeEach(() => {
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {
          provide: LoggerService,
          useValue: loggerSpy
        }
      ]
    });

    service = TestBed.get(CalculatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add two numbers', () => {
    const total = service.add(4, 2);
    console.log('adding two numbers');
    expect(total).toEqual(6);
  });

  it('should substract two numbers', () => {
    const total = service.subtract(10, 2);
    expect(total).toEqual(8);
  });

  it('should execute log method after add method invocation', () => {
    const calcService = new CalculatorService(loggerSpy);
    calcService.add(4, 2);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should execute log method after substract method invocation', () => {
    const calcService = new CalculatorService(loggerSpy);
    calcService.subtract(8, 2);

    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('should multiply two numbers', () => {
    const calcService = new CalculatorService(loggerSpy);
    const res = calcService.multiply(2, 3);

    expect(res).toEqual(6);
  });

  it('should execute log method after multiply invocation', () => {
    const calculatorService = new CalculatorService(loggerSpy);
    calculatorService.multiply(1, 2);

    expect(loggerSpy.log).toHaveBeenCalledWith('Multiply');
  });


});
