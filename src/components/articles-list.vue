<template>
  <div class='articles-list'>
    <van-pull-refresh
      v-model="dropDownLoading"
      :success-text="successText"
      @refresh="onRefresh"
    >
        <van-list
          v-model="atcilesLoading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <articles-item
            v-for="(article, index) in articles"
            :key="index"
            :article="article"
          />
          <!-- <van-cell v-for="(article, index) in articles" :key="index" :title="article.title" /> -->
        </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/articles'
import ArticlesItem from '@/components/articles-item'
export default {
  name: 'articlesList',
  components: {
    ArticlesItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      articles: [],
      pre_timestamp: null,
      atcilesLoading: false,
      finished: false,
      dropDownLoading: false,
      successText: ''
    }
  },
  methods: {
    // 加载文章列表数据
    async onLoad () {
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: this.pre_timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      const results = data.data.results
      this.articles.push(...results)
      this.atcilesLoading = false
      if (results.length) {
        this.pre_timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },

    // 下拉刷新
    async onRefresh () {
      // 下拉刷新，组件自己就会展示 loading 状态
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      // console.log(data)
      // 2. 把数据放到数据列表中（往顶部追加）
      this.articles.unshift(...data.data.results)
      // 3. 关闭刷新的状态 loading
      this.dropDownLoading = false
      this.successText = `刷新了${data.data.results.length}数据`
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
</style>
