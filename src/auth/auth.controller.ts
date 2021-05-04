import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';

import { AuthenticatedGuard, GoogleAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(GoogleAuthGuard)
  login() {
    return;
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  redirect(@Res() res: Response) {
    return res.redirect('http://localhost:3000/api/auth/status');
  }

  @Get('status')
  @UseGuards(AuthenticatedGuard)
  status(@Req() req: Request) {
    return req.user;
  }

  @Get('logout')
  @UseGuards(AuthenticatedGuard)
  logout(@Req() req: Request) {
    req.logOut();
    req.session.destroy((err) => {
      return err;
    });
  }
}
