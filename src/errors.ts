/*
 * @Author: your name
 * @Date: 2021-09-01 20:40:03
 * @LastEditTime: 2021-09-14 14:18:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stonelang_ts/src/erors.ts
 */

import {Token, NumToken, IdToken, StrToken} from './token'

function location(token: Token): string {
    if(token === Token.EOF) {
        return 'the last line'
    } else {
        return `\"${token.getText()}\" at line ${token.getLineNumber()}`
    }
}
export class  StoneError extends Error {
    constructor(m:string)
    constructor(m: string, t?: any) {
        super(m)
        // https://www.dannyguo.com/blog/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript/
        Object.setPrototypeOf(this, StoneError.prototype)
    }
}

export  class ParseError extends Error {
    constructor(token:Token)
    constructor(msg: string)
    constructor(msg: string, token: Token)
    constructor(a: Token| string, b?:Token) {
        let msg = '', token
        if(typeof a==='string') {
            msg = a
        } else {
            token = b
        }
        super(token ? `syntax error around ${location(token)}. ${msg}` : msg)
        Object.setPrototypeOf(this, ParseError.prototype)
    }
}