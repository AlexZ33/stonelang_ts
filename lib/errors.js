"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoneError = void 0;
/*
 * @Author: your name
 * @Date: 2021-09-01 20:40:03
 * @LastEditTime: 2021-09-07 17:11:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stonelang_ts/src/erors.ts
 */
var StoneError = /** @class */ (function (_super) {
    __extends(StoneError, _super);
    function StoneError(m, t) {
        var _this = _super.call(this, m) || this;
        // https://www.dannyguo.com/blog/how-to-fix-instanceof-not-working-for-custom-errors-in-typescript/
        Object.setPrototypeOf(_this, StoneError.prototype);
        return _this;
    }
    return StoneError;
}(Error));
exports.StoneError = StoneError;
//# sourceMappingURL=errors.js.map