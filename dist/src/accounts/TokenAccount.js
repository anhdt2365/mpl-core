"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAccount = void 0;
const errors_1 = require("../errors");
const Account_1 = require("./Account");
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
class TokenAccount extends Account_1.Account {
    constructor(pubkey, info) {
        super(pubkey, info);
        if (!this.assertOwner(spl_token_1.TOKEN_PROGRAM_ID)) {
            throw (0, errors_1.ERROR_INVALID_OWNER)();
        }
        if (!TokenAccount.isCompatible(this.info.data)) {
            throw (0, errors_1.ERROR_INVALID_ACCOUNT_DATA)();
        }
        this.data = (0, spl_token_1.unpackAccount)(new web3_js_1.PublicKey(pubkey.toString()), this.info);
    }
    static isCompatible(data) {
        return data.length === spl_token_1.AccountLayout.span;
    }
    static getTokenAccountsByOwner(connection, owner) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield connection.getTokenAccountsByOwner(new web3_js_1.PublicKey(owner), {
                programId: spl_token_1.TOKEN_PROGRAM_ID,
            })).value.map(({ pubkey, account }) => new TokenAccount(pubkey, account));
        });
    }
}
exports.TokenAccount = TokenAccount;
//# sourceMappingURL=TokenAccount.js.map