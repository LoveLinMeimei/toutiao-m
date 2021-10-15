// 封装本地存储模块

export const setStorage = (name, data) => {
  // 本地存储只能是字符串，如果要存储的是对象，需要JSON.stringify()转换一下
  if (typeof data === 'object') {
    data = JSON.stringify(data)
  }
  return window.localStorage.setItem(name, data)
}

export const getStorage = (name) => {
  const data = window.localStorage.getItem(name)
  // 因为data有可能不是JSON格式字符串，所以需要try...catch,不是JSON格式字符串的话就直接返回
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

export const removeStorage = (name) => {
  return window.localStorage.removeItem(name)
}
