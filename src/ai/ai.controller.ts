import { Post, Controller } from '@nestjs/common';
import { AiService } from './ai.service';

@Controller('/ai')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('')
  generate() {
    return this.aiService.generate();
  }
}
