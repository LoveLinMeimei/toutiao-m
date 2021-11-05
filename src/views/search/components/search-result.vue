<template>
  <div class='search-result-container'>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in resulutsList" :key="index" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { userSearchResult } from '@/api/search'
export default {
  name: 'SearchResultIndex',
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
      resulutsList: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10
    }
  },
  methods: {
    async onLoad () {
      const { data } = await userSearchResult({
        page: this.page,
        per_page: this.per_page,
        q: this.searchText
      })
      this.loading = false
      this.resulutsList.push(...data.data.results)
      if (this.resulutsList) {
        this.page = this.page + 1
      } else {
        this.finished = true
      }
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
.search-result-container {
  .van-list {
    position: fixed;
    top: 55px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    overflow-y: auto;
  }
}
</style>
