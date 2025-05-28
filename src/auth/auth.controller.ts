import { Post, Controller } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('login')
  login() {
    return 'auth:login';
  }

  @Post('signup')
  signup() {
    return 'auth:signup';
  }
}
