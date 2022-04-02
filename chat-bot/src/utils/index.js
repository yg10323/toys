export default {
  deepClone(obj) {
    // 对非对象进行过滤
    if (typeof obj !== 'object') return obj

    // 对null undefined 进行过滤
    if (obj == undefined) return obj

    // 对 RegExp Date Function 进行过滤
    if (obj instanceof RegExp) return new RegExp(obj)
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof Function) return new Function(obj)

    // 利用constructor进行实例化, 不管是对象还是数组
    let newObj = new obj.constructor()
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        newObj[key] = this.deepClone(obj[key])
      }
    }

    return newObj
  },
  // 格式化数据
  formatData(data) {
    for (let key in data) {
      data[key].counter = [];
      data[key].msgHasBeenShown = false;
      data[key].showMessage = {}
      for (let item of Object.keys(data[key].msg)) {
        data[key].showMessage[item] = ""
      }
    }

    return data;
  }
}