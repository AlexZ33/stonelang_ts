/*
 * @Author: your name
 * @Date: 2021-09-29 15:54:38
 * @LastEditTime: 2021-09-29 16:13:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /stonelang_ts/docs/typescrit_interface.ts
 */
// 属性接口 对json的约束
/**
 * ts中自定义方法传入参数对 json进行约束
 */
function printbale(labels: {label: string}): void {
    console.log(labels)
}

printbale({label: '2222'})

/** 
 *接口:行为和动作的规范  对批量方法进行约束
*/

interface FullName {
    firstName: string,
    secondName: string 
}

function printName(name: FullName) {
    console.log(name.firstName + '--' + name.secondName)
}


let  user = {firstName: 'Tom', secondName: 'User'}

printName(user)