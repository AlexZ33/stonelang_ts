/*
 * @Author: your name
 * @Date: 2021-09-03 15:49:40
 * @LastEditTime: 2021-09-03 17:24:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stonelang_ts/src/token.ts
 */

/**
 *Token抽象类
 *
 * @export
 * @abstract
 * @class Token
 */
export abstract class Token {
    
}

export class NumToken extends Token {
    private value: number
    
}

export class IdToken extends Token {
    private text: string

}

export class StrToken extends Token {
    private literal: string
}