import { ApiException } from "@core/exceptions/api.exception";

export class WalletException {
  static notFound(): ApiException {
    return new ApiException(200001, []);
  }
}
