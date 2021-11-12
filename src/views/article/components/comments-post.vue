<template>
  <div class='comments-post'>
    <van-field
      v-model.trim="content"
      rows="3"
      autosize
      border
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    >
      <van-button
        slot="extra"
        size="mini"
        :disabled="!content"
        @click="pushComments"
      >发布</van-button>
    </van-field>
  </div>
</template>

<script>
import { pushComments } from '@/api/comments.js'
export default {
  name: 'commentsPostIndex',
  components: {
  },
  props: {
    // 如果是发布文章评论，则传递文章 ID
    // 如果是发布评论回复，则传递评论ID
    target: {
      type: [Number, String, Object],
      required: true
    },
    // 如果是发布评论回复，则也需要传递文章ID
    articleId: {
      type: [Number, String, Object],
      default: null
    }
  },
  data () {
    return {
      content: '' // 输入框的内容
    }
  },
  methods: {
    // 发布新的评论
    async pushComments () {
      this.$toast.loading({
        message: '发布中',
        forbidClick: true
      })
      const { data } = await pushComments({
        target: this.target.toString(), // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id)
        content: this.content, // 评论内容
        art_id: this.articleId ? this.articleId.toString() : null // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
      })
      // console.log(data)
      const newObj = data.data.new_obj
      this.$emit('post-comments', newObj)
      this.$toast.success('发布成功')
      this.content = ''
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
.comments-post {
  padding: 2px;
  .van-cell {
    display: flex;
    align-items: center;
    color: #4A8ECF;
    /deep/ .van-cell__value {
      background-color: #f5f5f5;
      margin-right: 20px;
    }
  }
}
</style>
