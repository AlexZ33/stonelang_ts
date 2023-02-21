/*
 * @Author: your name
 * @Date: 2021-09-01 20:38:56
 * @LastEditTime: 2022-07-22 15:16:17
 * @LastEditors: AlexZ33 775136985@qq.com
 * @Description: In User Settings Edit
 * @FilePath: /stonelang_ts/src/lexer.ts
 */
import os from "os"
import {StoneError, ParseError} from './errors'
import { LineReader } from "./lineReader"

import {Token, NumToken, IdToken, StrToken} from './token'

/**
 *  Lexer类就是一个词法分析器
 *源文件将被分割为－－数字，字符串，标识符序列
 * @export
 * @class Lexer
 * ＠function hasNextLine() 
 * @function peek()
 * @function fillQueue() 
 * @function   read()
 * @function   readLine()
 * @function  addToken()
 */
export  class Lexer {
    //  定义静态变量regexPattern  ; 注释|数字|字符串|标识符（且不许为空）
    // 定义单词时使用了正则表达式。这样一来，就能够借助正则表达式库简单地实现词法分析器
    public static regexPattern : string =  '\\s*(?:(//.*)|([0-9]*)|("(?:\\"|\\\\\\|\\n|[^"])*")|([A-Z_a-z][A-Z_a-z0-9]*|==|=|<=|>=|<|>|&&|\\|\\||\\(|\\)|\\*|\\+|-|/|{|}|%|.))?'
    private  re = new RegExp(Lexer.regexPattern, 'g')
    // private  token = new NumToken()
    private queue: Token[] = []
    private reader: LineReader
    
    // 构造函数接收一个
    constructor(reader: LineReader) {
        this.reader = reader
    }

    hasNextLine(): boolean {
        return this.reader.hasNextLine()
    }
     
    /**
     *
     *
     * @param {number} i
     * @return {*}  {Promise<Token>} 返回Token.EOF
     * @memberof Lexer
     */
    async peek(i:number): Promise<Token> {
    　if(await this.fillQueue(i)) {
                return this.queue[i]
        }
        return Token.EOF
    }
    protected async fillQueue(i: number): Promise<boolean> {
        while(i>=this.queue.length) {
            if(this.hasNextLine()) {
                await this.readLine()
            } else {
                return false
            }
        }
    }
    /**
     *
     *
     * @return {*}  {Promise<Token>} 
     * @memberof Lexer
     */
    async read(): Promise<Token> {
        if(await this.fillQueue(0)) {
            return this.queue.shift()
        }
        return Token.EOF
    }

    protected async readLine(): Promise<void> {
        let line
        try {
            line = await this.reader.nextLine()
        } catch (error) {
            throw new ParseError(error.message)
        }

        if (line==null) {
            return 
        }

        const lineNo = this.reader.getLineNumber() 
        // const regExp = new RegExp(this.regexPattern, 'g')
        //RegExp.lastIndex 该索引表示从哪里开始下一个匹配
        while(this.re.lastIndex < line.length) {
            // RegExp.prototype.exec()  在该字符串中执行匹配项的搜索。
            const results = this.re.exec(line)
            if(results[0]) {
                this.addToken(lineNo, results)
            }
        }
    }

    protected addToken(lineNo: number, results: RegExpExecArray) {
        if(results[2] != null) {
            let token = new NumToken(lineNo, parseInt(results[2], 10))
            this.queue.push(token)
        } else if (results[3] != null) {
            const raw = results[3]
            const str = raw.substring(1, raw.length -1)
            let token = new StrToken(lineNo, str)
            this.queue.push(token)
        } else if (results[4]!= null) {
            let token = new IdToken(lineNo, results[4])
            this.queue.push(token)
        }
    }
}