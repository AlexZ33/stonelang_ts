/*
 * @Author: your name
 * @Date: 2021-09-29 15:35:34
 * @LastEditTime: 2021-09-29 15:53:50
 * @LastEditors: Please set LastEditors
 * @Description: https://zhuanlan.zhihu.com/p/270592378
 * @FilePath: docs/typescript_function.ts
 */
// 方法可选参数 ?
// 可选参数必须配置到参数的最后面

function gitInfo(name: string, age?: number): void {
    console.log(name + '' + age)
}

// test
gitInfo("alex")
gitInfo("alex2", 28)

function result(...result:any): void {
    console.log(result); // 剩余参数
}

result(1,2,3)

// ts函数重载 指两个或者两个以上的同名函数,但它们的参数不一样,这时会出现函数重载的情况
// ts中的重载,通过为同一个函数提供多个函数类型定义来实现多种功能的目的