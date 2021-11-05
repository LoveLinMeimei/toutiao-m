<template>
  <div class='search-record'>
    <van-cell
      v-for="(str, index) in recordList"
      :key="index"
      icon="search"
      @click="$emit('search', str)"
    >
      <div slot="title" v-html="str && hightlight(str)"></div>
    </van-cell>
  </div>
</template>

<script>
import { userSearchRecord } from '@/api/search.js'
import { debounce } from 'lodash'
export default {
  name: 'SearchRecordIndex',
  components: {
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      recordList: [] // 联想数据数据列表
    }
  },
  methods: {
    hightlight (str) {
      return str.replace(new RegExp(this.searchText, 'gi'), `<span style='color: red'>${this.searchText}</span>`)
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  watch: {
    searchText: {
      // 当数据发生变化则会执行handler处理函数
      handler: debounce(async function () {
        const { data } = await userSearchRecord(this.searchText)
        this.recordList = data.data.options
      }, 200),
      // 该回调将会在监听开始之后立刻执行
      immediate: true
    }
  }
}
</script>
<style scoped lang="less">
</style>
