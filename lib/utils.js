"use strict";
/*
 * @Author: AlexZ33
 * @Date: 2021-09-07 19:53:01
 * @wechat:  zk_lp3333
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @Reference: https://blog.csdn.net/qq_41463655/article/details/103148911
 * @FilePath: /stonelang_ts/src/utils.ts
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayList = void 0;
var ArrayList = /** @class */ (function () {
    function ArrayList(initialCapacity) {
        // ArrayList实际数量， initialCapacity是Arraylist的默认容量大小。当由于增加数据导致容量不足时，容量会添加上一次容量大小的一半。(自动扩容1.5x)
        this.sizeNum = 0;
        if (typeof initialCapacity === 'number') {
            // 设置初始集合容积大小
            if (initialCapacity < 0) {
                throw new Error("is no arrayList index:" + initialCapacity);
            }
            this.elementData = new Array(initialCapacity);
        }
        else {
            //初始化集合大小
            this.constructor(10);
        }
    }
    ArrayList.prototype.add = function (arg0, arg1) {
        if (typeof arg0 === "number") {
            //索引添加
            this.ensureExplicitVapacity();
            this.rangeCheck(arg0);
            this.elementData.splice(arg0, arg1);
            this.sizeNum++;
        }
        else {
            // 普通添加，容量计算
            this.ensureExplicitVapacity();
            this.elementData[this.sizeNum] = arg0;
            this.sizeNum++;
        }
    };
    /**
     *通过下标查询对象
     *
     * @param {number} index 索引
     * @return {*}  {Object}
     * @memberof ArrayList
     */
    ArrayList.prototype.get = function (index) {
        this.rangeCheck(index);
        return this.elementData[index];
    };
    /**
     * 更新数据
     *
     * @param {number} index 下标
     * @param {E} Object 对象数据
     * @memberof ArrayList
     */
    ArrayList.prototype.update = function (index, Object) {
        this.rangeCheck(index);
        this.elementData[index] = Object;
    };
    ArrayList.prototype.remove = function (arg0) {
        if (typeof arg0 === 'number') {
            //删除指定下标数据
            this.elementData.splice(arg0, 1);
            this.sizeNum--;
            return true;
        }
        else {
            // 删除具体数据, 数据多不建议使用
            var result = false;
            for (var i = 0; i < this.sizeNum; i++) {
                if (this.get(i) === arg0) {
                    result = this.remove(i);
                }
            }
            if (result == false) {
                console.log("is no object");
                return result;
            }
        }
    };
    /**
     *获取集合长度
     * @return {*}  {number}
     * @memberof ArrayList
     */
    ArrayList.prototype.size = function () {
        return this.sizeNum;
    };
    /**
     * 检测数组是否下标越界, 是抛出越界异常
     * @private
     * @param {number} index
     * @memberof ArrayList
     */
    ArrayList.prototype.rangeCheck = function (index) {
        if (index >= this.sizeNum || index < 0) {
            throw new Error("is no index --->" + index);
        }
    };
    /**
     *自动扩容1.5X
     *  <<: 左移运算符， num << 1 , 相当于num乘以2
     * >> : 右移运算符, num >> 1, 相当于num 除以2
     * @memberof ArrayList
     */
    ArrayList.prototype.ensureExplicitVapacity = function () {
        if (this.elementData.length < this.sizeNum + 1) {
            // 当前集合实际容量
            var oldCapacity = this.elementData.length;
            // 扩容1.5倍后的数
            var newCapacity = oldCapacity + (oldCapacity >> 1);
            // 修改集合容量
            this.elementData.length = newCapacity;
            // console.log(this.elementData.length + "-->" + newCapacity + "-->"  + this.elementData)
        }
    };
    return ArrayList;
}());
exports.ArrayList = ArrayList;
// export class LinkedList<E> implements List<E> {
// }
//# sourceMappingURL=utils.js.map


