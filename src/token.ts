/*
 * @Author: your name
 * @Date: 2021-09-03 15:49:40
 * @LastEditTime: 2021-09-07 19:49:17
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @Reference: https://github.com/chibash/stone/blob/master/src/stone/Token.java
 * @FilePath: /stonelang_ts/src/token.ts
 */

import os from "os"

import {StoneError} from './errors'

/**
 *Token抽象类
 *
 * @export
 * @abstract
 * @class Token
 */
export abstract class Token {
    static readonly EOF = new class extends Token{}(-1) // end of file
    // 操作系统特定的行尾标记。POSIX 上是 \n   Windows 上是 \r\n
    static readonly EOL = os.EOL   // end of line 

    private lineNumber: number // 

    constructor(lineNum: number) {
        this.lineNumber = lineNum
    }
    
    getLineNumber(): number {
        return this.lineNumber
    }

    isIdentifier(): boolean {
        return false
    }

    isNumber(): boolean {
        return false
    }

    isString(): boolean {
        return false
    }

    getNumber(): number {
        throw new StoneError('not number token')
    }

    getText(): String {
        return ""
    }
}

export class NumToken extends Token {
    private value: number
    
    constructor(lineNum: number, v:number) {
        super(lineNum)
        this.value = v
    }

    isNumber(): boolean {
        return true
    }

    getText(): string {
        return this.value + ''
    }

    getNumber(): number {
        return this.value
    }
}

export class IdToken extends Token {
    private text: string
    constructor(lineNum: number, id:string) {
        super(lineNum)
        this.text = id
    }
    isIdentifier(): boolean {
        return true
    }

    getText(): string {
        return this.text
    }

}

export class StrToken extends Token {
    private literal: string
    constructor(lineNum: number, str:string) {
        super(lineNum)
        this.literal = str
    }

    isString(): boolean {
        return true
    }

    getText(): string {
        return this.literal
    }
}