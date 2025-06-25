import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RefreshToken } from './entities/refresh-token.entity';

@Injectable()
export class RefreshTokenIdsStorage {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  async insert(userId: number, tokenId: string): Promise<void> {
    await this.refreshTokenRepository.upsert(
      { user: { id: userId }, tokenId },
      ['user.id'],
    );
  }

  async validate(userId: number, tokenId: string): Promise<boolean> {
    const token = await this.refreshTokenRepository.findOneBy({
      user: { id: userId },
    });
    return tokenId === token?.tokenId;
  }

  async invalidate(userId: number): Promise<void> {
    await this.refreshTokenRepository.delete({ user: { id: userId } });
  }
}
