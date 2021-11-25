import Vue from 'vue'
import Vuex from 'vuex'

import { getStorage, setStorage } from '@/utils/storage.js'

Vue.use(Vuex)

const USER_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  // 把token存在vuex的好处：每个组件都可以拿到token，但是页面一刷新这些数据就会没有，所以还需要本地存储
  state: {
    user: getStorage(USER_KEY),
    // 因为我们在App.vue中keep-alive缓存了组件LayoutIndex，登录页面属于LayoutIndex的子路由，所以也会被缓存，当退出登录重新登录另一个账号时，登录页面还是以前的账号，因为被缓存了
    // 首页也是属于LayoutIndex，所以切换账号还是以前账号的推荐列表，需要重新刷新才可以
    // 解决方案是： 在登录成功时清除缓存，在LayoutIndex中添加缓存
    cachePage: ['LayoutIndex'] // 需要缓存的组件name
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setStorage(USER_KEY, state.user)
    },
    addCachePage (state, cpmName) {
      // 添加需要缓存的组件
      if (!state.cachePage.includes(cpmName)) {
        state.cachePage.push(cpmName)
      }
    },
    removeCachePage (state, cpmName) {
      const index = state.cachePage.indexOf(cpmName)
      if (index !== -1) {
        state.cachePage.splice(index, 1)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
