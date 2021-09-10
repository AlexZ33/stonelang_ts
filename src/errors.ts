/*
 * @Author: your name
 * @Date: 2021-09-01 20:40:03
 * @LastEditTime: 2021-09-07 17:11:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stonelang_ts/src/erors.ts
 */
export class  StoneError extends Error {
    constructor(m:string)
    constructor(m: string, t?: any) {
        super(m)
        // https://www.dannyguo.com/blog/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript/
        Object.setPrototypeOf(this, StoneError.prototype)
    }
}