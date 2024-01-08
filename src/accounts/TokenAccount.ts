import { ERROR_INVALID_ACCOUNT_DATA, ERROR_INVALID_OWNER } from '../errors';
import { AnyPublicKey } from '../types';
import { Account } from './Account';
import {
  Account as TokenAccountInfo,
  AccountLayout,
  TOKEN_PROGRAM_ID,
  unpackAccount,
} from '@solana/spl-token';
import { AccountInfo, Connection, PublicKey } from '@solana/web3.js';
import { Buffer } from 'buffer';

export class TokenAccount extends Account<TokenAccountInfo> {
  constructor(pubkey: AnyPublicKey, info: AccountInfo<Buffer>) {
    super(pubkey, info);

    if (!this.assertOwner(TOKEN_PROGRAM_ID)) {
      throw ERROR_INVALID_OWNER();
    }

    if (!TokenAccount.isCompatible(this.info.data)) {
      throw ERROR_INVALID_ACCOUNT_DATA();
    }

    this.data = unpackAccount(new PublicKey(pubkey.toString()), this.info);
  }

  static isCompatible(data: Buffer) {
    return data.length === AccountLayout.span;
  }

  static async getTokenAccountsByOwner(connection: Connection, owner: AnyPublicKey) {
    return (
      await connection.getTokenAccountsByOwner(new PublicKey(owner), {
        programId: TOKEN_PROGRAM_ID,
      })
    ).value.map(({ pubkey, account }) => new TokenAccount(pubkey, account));
  }
}
