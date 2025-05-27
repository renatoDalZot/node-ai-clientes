import { Injectable } from '@nestjs/common';
import { timeStamp } from 'console';

@Injectable()
export class AppService {
  async getHello(timeOut : number): Promise <string> {
    // Simulate a delay to mimic an asynchronous operation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Hello World - time ' + new Date().toISOString());
      }, timeOut);
    });    
  }
}
