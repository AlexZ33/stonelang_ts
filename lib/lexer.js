"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lexer = void 0;
/**
 *源文件将被分割为－－数字，字符串，标识符序列
 * @export
 * @class Lexer
 */
var Lexer = /** @class */ (function () {
    function Lexer() {
        this.queue = [];
    }
    //  定义静态变量regexPattern  ; 注释|数字|字符串|标识符（且不许为空）
    Lexer.regexPattern = '\\s*(?:(//.*)|([0-9]*)|("(?:\\"|\\\\\\|\\n|[^"])*")|([A-Z_a-z][A-Z_a-z0-9]*|==|=|<=|>=|<|>|&&|\\|\\||\\(|\\)|\\*|\\+|-|/|{|}|%|.))?';
    return Lexer;
}());
exports.Lexer = Lexer;
//# sourceMappingURL=lexer.js.map