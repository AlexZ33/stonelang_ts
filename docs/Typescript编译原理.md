<!--
 * @Author: AlexZ33 775136985@qq.com
 * @Date: 2022-07-21 16:40:53
 * @LastEditors: AlexZ33 775136985@qq.com
 * @LastEditTime: 2022-07-21 16:43:38
 * @FilePath: /stonelang_ts/docs/Typescript编译原理.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/jkchao/typescript-book-chinese/blob/master/docs/compiler/overview.md
-->

TypeScript 编译器源文件位于 [src/compile](https://github.com/Microsoft/TypeScript/tree/main/src/compiler)

它分为以下几个关键部分：

Scanner 扫描器（scanner.ts）
Parser 解析器（parser.ts）
Binder 绑定器（binder.ts）
Checker 检查器（checker.ts）
Emitter 发射器（emitter.ts）