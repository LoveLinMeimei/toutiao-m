<template>
  <div class='comments-list-container'>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <comments-item
        @openPopup="$emit('openPopup', $event)"
        class="list-cell"
        v-for="(comment, index) in list"
        :key="index"
        :comments-item="comment"
        center
      />
    </van-list>
  </div>
</template>

<script>
import { getComments } from '@/api/comments.js'
import CommentsItem from './comments-item.vue'
export default {
  name: 'CommentsListIndex',
  components: {
    CommentsItem
  },
  props: {
    // 如果获取文章评论，则传递文章ID
    // 如果获取评论回复，则传递评论ID
    articleId: {
      type: [String, Number, Object],
      required: true
    },
    list: {
      type: Array,
      default: () => []
      // required: true
    },
    // 获取文章评论，使用字符a
    // 获取评论回复，使用字符c
    type: {
      type: String,
      default: 'a'
    }
  },
  data () {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null, // 评论数据的偏移量
      limit: 10 // 评论数据个数
    }
  },
  methods: {
    async onLoad () {
      // 获取数据
      const { data } = await getComments({
        type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId.toString(), // 源id，文章id或评论id
        offset: this.offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
        limit: this.limit // 获取的评论数据个数，不传表示采用后端服务设定的默认每页数据量
      })
      const results = data.data.results

      // 把数据total_count发送给父组件
      this.$emit('updata-total-count', data.data.total_count)

      // 把数据放到list里面
      this.list.push(...results)

      // 加载状态结束
      this.loading = false
      // 判断数据是否加载完
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        // 结束
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
</style>
