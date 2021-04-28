import {Injectable} from '@angular/core';
import {LoggerService} from './logger.service';


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private logger: LoggerService) {}

  public add(n1: number, n2: number): number {
    this.logger.log("Addition operation called");
    return n1 + n2;
  }

  public subtract(n1: number, n2: number): number {
    this.logger.log("Subtraction operation called");
    return n1 - n2;
  }

  public multiply(n1: number, n2: number): number {
    this.logger.log('Multiply');
    return n1 * n2;
  }


}

