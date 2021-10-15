import Vue from 'vue'
import Vuex from 'vuex'

import { getStorage, setStorage } from '@/utils/storage.js'

Vue.use(Vuex)

const USER_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  // 把token存在vuex的好处：每个组件都可以拿到token，但是页面一刷新这些数据就会没有，所以还需要本地存储
  state: {
    user: getStorage(USER_KEY)
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // window.localStorage.setItem('user', JSON.stringify(state.user))
      setStorage(USER_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
