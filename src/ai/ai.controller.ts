import { Post, Controller } from '@nestjs/common';

@Controller('ai')
export class AiController {
  @Post('')
  generate() {
    return 'ai';
  }
}
