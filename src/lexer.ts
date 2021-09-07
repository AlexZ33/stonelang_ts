/*
 * @Author: your name
 * @Date: 2021-09-01 20:38:56
 * @LastEditTime: 2021-09-03 15:50:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stonelang_ts/src/lexer.ts
 */
import os from "os"
import {stoneError, ParseError} from './errors'

import {Token} from './token'

/**
 *源文件将被分割为－－数字，字符串，标识符序列
 * @export
 * @class Lexer
 */
export  class Lexer {
    //  定义静态变量regexPattern  ; 注释|数字|字符串|标识符（且不许为空）
    public static regexPattern : string =  '\\s*(?:(//.*)|([0-9]*)|("(?:\\"|\\\\\\|\\n|[^"])*")|([A-Z_a-z][A-Z_a-z0-9]*|==|=|<=|>=|<|>|&&|\\|\\||\\(|\\)|\\*|\\+|-|/|{|}|%|.))?'
    private queue
}