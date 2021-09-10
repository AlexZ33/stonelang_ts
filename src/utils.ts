/*
 * @Author: AlexZ33
 * @Date: 2021-09-07 19:53:01
 * @wechat:  zk_lp3333
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @Reference: 
 *  https://blog.csdn.net/qq_41463655/article/details/103148911
 * https://github.com/oberpro/ts-list/blob/master/list.ts
 * @FilePath: /stonelang_ts/src/utils.ts
 */

/**
 * https://www.cnblogs.com/msymm/p/9872818.html
 * java 有ArrayList ，但 TypeScript 没有
 * ArrayList 是一个数组队列，相当于 动态数组。
 * ArrayList 采用数组实现, 提供了相关的添加、删除、修改、遍历等功能
 * ArrayList 继承了AbstractList，实现了List。它是一个数组队列，提供了相关的添加、删除、修改、遍历等功能。
* ArrayList 实现了RandmoAccess接口，即提供了随机访问功能。RandmoAccess是java中用来被List实现，为List提供快速访问功能的。在ArrayList中，我们即可以通过元素的序号快速获取元素对象；这就是快速随机访问。稍后，我们会比较List的“快速随机访问”和“通过Iterator迭代器访问”的效率。
* ArrayList 实现了Cloneable接口，即覆盖了函数clone()，能被克隆。
* ArrayList 实现java.io.Serializable接口，这意味着ArrayList支持序列化，能通过序列化去传输。
 * 所以, 我们需要实现  包含以下功能:List, RandomAccess, Cloneable, serializable
 * 1. 最后添加对象/ 内容
 * 2. 指定索引添加
 * 3. 修改指定索引、对象/ 内容
 * 4. 根据对象|内容 删除
 * 5. 根据索引删除
 * 6. 根据索引获取对象|内容
 * 7. 获取集合长度
 * 8.自动扩容
*/


export interface List<E> {
    // LinkedList + ArrayList 通用接口
    add(object: E); // 添加对象
    add(index: number, object:E);  // 指定索引添加对象
    remove(index: number) : boolean; // 指定索引删除对象
    remove(obeject: E): boolean; //具体对象删除
    get(index: number): Object; // 通过索引获取对象， for循环获取必备
    size(): Number; // 获取list长度
    update(index: number, Object: E): void; //修改指定索引数据
 
}

export class  ArrayList<E> implements List<E> {
    // 定义属性集合
    elementData: Object[];

    // ArrayList实际数量， initialCapacity是Arraylist的默认容量大小。当由于增加数据导致容量不足时，容量会添加上一次容量大小的一半。(自动扩容1.5x)
    sizeNum: number = 0
    constructor()
    constructor(initialCapacity: number)
    constructor(initialCapacity?) {
        if(typeof initialCapacity === 'number') {
            // 设置初始集合容积大小
            if(initialCapacity < 0) {
                throw new Error("is no arrayList index:" + initialCapacity);
            }
            this.elementData = new Array<Object>(initialCapacity)
        } else {
            //初始化集合大小
            this.constructor(10)
        }
    }
    /**
     * 添加
     *
     * @param {arg0} 只有一个参数时候为对象值，存在两个参数的时候为下标(index)
     * @param {arg1} 当存在两个参数的时候为对象值
     * @memberof ArrayList
     */
    add(oject: E) 
    add(index: number, object:E)
    add(arg0?, arg1?){
        if(typeof arg0 === "number") {
            //索引添加
            this.ensureExplicitVapacity()
            this.rangeCheck(arg0)
            this.elementData.splice(arg0, arg1)
            this.sizeNum++;
            }else {
                // 普通添加，容量计算
                this.ensureExplicitVapacity();
                this.elementData[this.sizeNum] = arg0;
                this.sizeNum++;
            }
        }
    /**
     *通过下标查询对象
     *
     * @param {number} index 索引
     * @return {*}  {Object}
     * @memberof ArrayList
     */
    get(index: number): Object{
        this.rangeCheck(index);
        return this.elementData[index];
    }
    /**
     * 更新数据
     *
     * @param {number} index 下标
     * @param {E} Object 对象数据
     * @memberof ArrayList
     */
    update(index: number, Object:E): void {
        this.rangeCheck(index)
        this.elementData[index] = Object;
    }
    
    /**
     *删除
     *
     * @param {E} object
     * @return {*}  {boolean}
     * @memberof ArrayList
     */
    remove(object:E): boolean;
    remove(index: number): boolean;
    remove(arg0:number | E): boolean{
        if(typeof  arg0 === 'number') {
            //删除指定下标数据
            this.elementData.splice(arg0, 1)
            this.sizeNum--;
            return true;
        } else {
            // 删除具体数据, 数据多不建议使用
            let result = false;
            for (let i=0; i < this.sizeNum; i++) {
                 if(this.get(i) === arg0) {
                     result = this.remove(i)
                 }
            }
            
            if(result == false) {
                console.log("is no object");
                return result;
            }
        }
    }
    /**
     *获取集合长度
     * @return {*}  {number}
     * @memberof ArrayList
     */
    public size(): number {
        return this.sizeNum;
    }
    /**
     * 检测数组是否下标越界, 是抛出越界异常
     * @private
     * @param {number} index
     * @memberof ArrayList
     */
    private rangeCheck(index: number): void {
        if(index >= this.sizeNum || index <0) {
            throw new Error("is no index --->" + index)
        }
    }
    /**
     *自动扩容1.5X
     *  <<: 左移运算符， num << 1 , 相当于num乘以2
     * >> : 右移运算符, num >> 1, 相当于num 除以2
     * @memberof ArrayList
     */
    public ensureExplicitVapacity(): void {
        if(this.elementData.length < this.sizeNum + 1) {
            // 当前集合实际容量
            let oldCapacity: number = this.elementData.length;
            // 扩容1.5倍后的数
            let newCapacity: number = oldCapacity + (oldCapacity >>1);
            // 修改集合容量
            this.elementData.length = newCapacity;
            // console.log(this.elementData.length + "-->" + newCapacity + "-->"  + this.elementData)
        }
    }
}


// export class LinkedList<E> implements List<E> {
    
// }