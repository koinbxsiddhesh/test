import { Controller, Get, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@Req() request: Request): { message: string; ip: string ,address: any} {
    console.log('req',request.ip);
    console.log(`request.headers['x-forwarded-for'] `,request.headers['x-forwarded-for'] );
    console.log(`request.socket.remoteAddress`, request.socket.remoteAddress);
    console.log(`request.socket.address`, request.socket.address());
    
    // Extract the client IP address
    let clientIp:any = request.headers['x-forwarded-for'] || request.socket.remoteAddress;

    // Handle potential IPv6 format
    if (clientIp && clientIp.includes(',')) {
      clientIp = clientIp.split(',')[0]; // Get the first IP if multiple are present
    }

    if (clientIp.startsWith('::ffff:')) {
      clientIp = clientIp.replace('::ffff:', ''); // Convert to IPv4
    }

    // Return a message along with the IP address
    return {
      message: this.appService.getHello(),
      ip: clientIp,
      address: request.socket.address()
    };
  }
}
