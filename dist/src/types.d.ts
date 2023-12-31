import { Connection, PublicKey } from '@solana/web3.js';
export type StringPublicKey = string;
export type AnyPublicKey = StringPublicKey | PublicKey;
export type RpcRequest = (methodName: string, args: Array<any>) => any;
export type ConnnectionWithRpcRequest = Connection & {
    _rpcRequest: RpcRequest;
};
