import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { timestamp } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Exmperimentos com sincronicidade e assincronicidade
  @Get('/hellow/:miliseconds')
  getHello(@Param('miliseconds', ParseIntPipe) miliseconds: number): Promise<string> {
    return new Promise(async (resolve) => {
      var hello = await this.appService.getHello(miliseconds);
      console.log("gerando hello...time: " + timestamp().toString());
      resolve(hello);
    });    
  }

  // Exmperimentos com sincronicidade e assincronicidade
  @Get('/hellow/v2/:miliseconds')
  getHelloV2(@Param('miliseconds', ParseIntPipe) miliseconds: number): string {
    this.sleepSync(miliseconds);
    /* setTimeout(() => {
    console.log("esperando..."); 
    }, miliseconds); */
    console.log("teste");
    return "Hello" + new Date().toISOString();
  }   

  sleepSync(ms: number) {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    // Loop vazio, bloqueia a thread
  }
}
}
