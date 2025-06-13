import { Controller, Post, Body, UseGuards, Request, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { ResponseUtil } from 'src/utils/response.util';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    
    try {
      const users=await this.authService.login(loginDto);
      return ResponseUtil.success(users, 'Berhasil login');
    } catch (error) {
      return ResponseUtil.error(error.message || 'Failed to login');
    }
  }
}