import { Controller, Get, Param } from '@nestjs/common';
import { WalletService } from '@app/services/wallet.service';
import { WalletResource } from '@app/api/resources/wallet.resource';

@Controller({ path: 'wallets' })
export class ShowController {
  constructor(private readonly walletService: WalletService) {}

  @Get(':userId')
  async show(@Param('userId') userId: string): Promise<WalletResource> {
    try {
      const wallet = await this.walletService.findByUserId(userId);

      return WalletResource.successResponse(wallet);
    } catch (error) {
      return WalletResource.errorResponse(error);
    }
  }
}
