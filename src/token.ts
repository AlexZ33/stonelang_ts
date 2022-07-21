/*
 * @Author: your name
 * @Date: 2021-09-03 15:49:40
 * @LastEditTime: 2022-07-21 19:18:21
 * @LastEditors: AlexZ33 775136985@qq.com
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
 *Token（单词）抽象类
 *该抽象类将记录单词对应的字符串，单词的类型，单词所处位置的行号等信息 (把单词的种类限定为3种，还真是敷衍啊~)
 * @export
 * @abstract
 * @class Token
 * @function getLineNumber() 获取单词所处位置的行号等信息
 * @function isIdentifier() 判断单词是否是标识符
 * @function isNumber() 判断单词是否是数字
 * @function isString() 判断单词是否是字符串
 * @function getNumber() 获取单词对应的数字
 * @function getText() 获取单词的字符串
 */
export abstract class Token {
    static readonly EOF= new class extends Token{}(-1) // end of file　用于表示程序结束
    // 操作系统特定的行尾标记。POSIX 上是 \n   Windows 上是 \r\n
    static readonly EOL: string = os.EOL   // end of line 　用于表示换行符  它是一个String对象，也就是说，只是一个单纯的字符串。

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

/**
 *Token类根据单词的类型，又定义了不同的子类。
 *StoneLang语言含有标识符、整型字面量和字符串字面量这三种类型的单词，每种单词都定义了对应的Token类的子类
 * @export 
 * @class NumToken 整型字面量
 * @extends {Token}
 */
export class NumToken extends Token {
    private value: number  // 其实可以使用enum之类的类型，　也是整型字面量
    
    constructor(lineNum: number, v:number) {
        super(lineNum)
        this.value = v
    }
　
    // 如果是整型字面量则为真 
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

/**
 *
 *
 * @export
 * @class IdToken 标识符类
 * @extends {Token}
 */
export class IdToken extends Token {
    private text: string
    constructor(lineNum: number, id:string) {
        super(lineNum)
        this.text = id
    }
    // 如果是标识符则为真
    isIdentifier(): boolean {
        return true
    }

    getText(): string {
        return this.text
    }

}


/**
 *
 *
 * @export
 * @class StrToken 字符串字面量类
 * @extends {Token}
 */
export class StrToken extends Token {
    private literal: string
    constructor(lineNum: number, str:string) {
        super(lineNum)
        this.literal = str
    }

    // 如果是字符串字面量则为真
    isString(): boolean {
        return true
    }

    getText(): string {
        return this.literal
    }
}