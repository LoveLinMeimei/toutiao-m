<template>
  <div class='search-container'>
    <form action="/">
      <van-search
        v-model="searchText"
        background="#3692FA"
        action-text
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch(searchText)"
        @focus="searchResult=false"
      >
        <template #action>
          <div @click=$router.back()>取消</div>
        </template>
      </van-search>
    </form>
    <search-result v-if="searchResult" :search-text="searchText"></search-result>
    <search-record
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    ></search-record>
    <search-history
      @search="onSearch"
      :history-list="historyList"
      @history="historyList=$event"
      v-else
    >
    </search-history>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchRecord from './components/search-record.vue'
import SearchResult from './components/search-result.vue'
import { setStorage, getStorage } from '@/utils/storage'
export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchRecord,
    SearchResult
  },
  props: {
  },
  data () {
    return {
      searchText: '',
      searchResult: false,
      historyList: getStorage('history-list') || null
    }
  },
  methods: {
    onSearch (searchText) {
      this.searchText = searchText
      // 把搜索记录存在数组中
      const index = this.historyList.indexOf(searchText)
      if (index === -1) {
        this.historyList.unshift(searchText)
        // setStorage('history-list', this.historyList)
      }
      this.searchResult = true
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  watch: {
    historyList () {
      setStorage('history-list', this.historyList)
    }
  }
}
</script>
<style scoped lang="less">
.search-container {
  .van-search__action {
    color: #fff
  }
}
</style>
