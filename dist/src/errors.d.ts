import { AnyPublicKey } from './types';
export declare enum ErrorCode {
    ERROR_INVALID_OWNER = 0,
    ERROR_INVALID_ACCOUNT_DATA = 1,
    ERROR_DEPRECATED_ACCOUNT_DATA = 2,
    ERROR_ACCOUNT_NOT_FOUND = 3
}
export declare class MetaplexError extends Error {
    errorCode: ErrorCode;
    constructor(errorCode: ErrorCode, message: string);
}
export declare const ERROR_INVALID_OWNER: () => MetaplexError;
export declare const ERROR_INVALID_ACCOUNT_DATA: () => MetaplexError;
export declare const ERROR_DEPRECATED_ACCOUNT_DATA: () => MetaplexError;
export declare const ERROR_ACCOUNT_NOT_FOUND: (pubkey: AnyPublicKey) => MetaplexError;
