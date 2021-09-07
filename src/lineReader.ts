/*
 * @Author: your name
 * @Date: 2021-09-01 20:41:47
 * @LastEditTime: 2021-09-07 14:56:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stonelang_ts/src/lineReader.ts
 */
import lineReader from 'line-reader'
// 表示 如果typeof lineReader.open 能赋值给 (file, cb: (err, reader: infer P) => void) => void, 则结果是(file, cb: (err, reader: infer P) => void) => void类型中的参数P , 否则返回never
type Reader = typeof lineReader.open extends (file, cb: (err, reader: infer P)=> void)=> void ? P: never

const createReader = (filename: string): Promise<Reader> => 
    new Promise((resolve, reject) => {
        lineReader.open(filename, (err, reader)=> {
            if(err) {
                reject(err)
            } else {
                resolve(reader)
            }
        })
    })

const nextLine = (reader: Reader) : Promise<string> => 
new Promise((resolve, reject) => {
    reader.nextLine((err, line) => {
        if(err) {
            reject(err)
        } else {
            resolve(line)
        }
    })
}) 

const closeReader = (reader:Reader): Promise<void> => 
    new Promise((resolve, reject) => {
        reader.close(err => {
            if (err) {
                reject(err)
            } else{
                resolve()
            }
        })
    })


    export interface LineReader {
        getLineNumber(): number
        hasNextLine(): boolean
        nextLine(): Promise<string>
    }

    export class FileLineReader {
        private readonly filename: string
        private reader: Reader
        private lineNumber: number = -1

        constructor(filename: string) {
            this.filename = filename
        }

        getLineNumber(): number {
            return this.lineNumber
        }

        hasNextLine(): boolean{
            return this.reader.hasNextLine()
        }
        async nextLine(): Promise<string> {
            if (!this.reader) {
                this.reader = await createReader(this.filename)
            }

            if(!this.reader.hasNextLine()) {
                await closeReader(this.reader)
                return null
            }

            ++this.lineNumber

            return await nextLine(this.reader)
        }
    }