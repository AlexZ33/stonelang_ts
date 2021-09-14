/*
 * @Author: your name
 * @Date: 2021-09-03 15:49:40
 * @LastEditTime: 2021-09-10 15:28:15
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @Reference: https://github.com/chibash/stone/blob/master/src/stone/Token.java
 * @FilePath: /stonelang_ts/src/token.ts
 */

import os from "os"

import {StoneError} from './errors'


/**
 *词法分析的结果称为单词(token)
 *   1. 词法分析将筛选出程序的解释与执行必须的成分，单词之间的空白或者注释会在这一阶段被去除掉
 *   2. 词法分析器将把程序源代码视作字符串，并将它分割成若干单词。 分割后得到的单词并不是简单地用`String`对象表示，而是用下面这种Token对象，它将
*    - 记录单词对应的字符串
*    - 保存单词的类型
*    - 单词所处位置的行号等信息
 */

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