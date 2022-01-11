// 封装操作localStorage本地储存的方法 模块化的文件

// nodejs 基础
const storage = {

  set (key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get (key) {
    return JSON.parse(localStorage.getItem(key))
  },
  remove (key) {
    localStorage.removeItem(key)
  }

}

export default storage
