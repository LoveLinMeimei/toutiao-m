<template>
  <div class='comments-reply-container'>
    <!-- 头部信息 -->
      <van-nav-bar center :title="`${commentsItem.reply_count}条回复`">
        <van-icon
          slot="left"
          name="cross"
          @click="$emit('close')"
        />
      </van-nav-bar>
    <!-- /头部信息 -->
    <van-divider />
    <!-- 当前评论项 -->
    <comments-item :commentsItem="commentsItem" :showReply="false"></comments-item>
    <!-- /当前评论项 -->
    <van-divider />
    <div class="allComments">所有评论回复</div>
    <!-- 所有评论回复 -->
    <comments-list
      type="c"
      :articleId="commentsItem.com_id"
      :list="list"
    ></comments-list>
    <!-- /所有评论回复 -->
    <!-- 底部区域 -->
    <div class="comments-footer">
      <van-button
        class="comments-btn"
        type="default"
        round
        @click="commentsReply=true"
      >写评论</van-button>
    </div>
    <!-- /底部区域 -->
    <!-- 评论的回复 -->
      <van-popup
        v-model="commentsReply"
        position="bottom"
      >
        <comments-post
          :target="commentsItem.com_id"
          :articleId="articleId"
          @post-comments="onUpdataCommentsReply"
        ></comments-post>
      </van-popup>
      <!-- /评论的回复 -->
  </div>
</template>

<script>
import CommentsItem from './comments-item.vue'
import CommentsList from './comments-list.vue'
import CommentsPost from './comments-post.vue'

export default {
  name: 'CommentsReplyIndex',
  components: {
    CommentsItem,
    CommentsList,
    CommentsPost
  },
  props: {
    // 查看回复的评论项
    commentsItem: {
      type: Object,
      required: true
    },
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      list: [], // 评论列表
      commentsReply: false // 评论的弹出层
    }
  },
  methods: {
    // 点击发布评论的回复
    onUpdataCommentsReply (newObj) {
      // 把数据同步到列表中
      this.list.unshift(newObj)
      // 更新评论总数
      this.commentsItem.reply_count++
      // 关闭弹窗
      this.commentsReply = false
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
.comments-reply-container {
  .van-divider {
    margin: 0px 0px 16px 0px;
  }
  .allComments {
    font-size: 14px;
    margin-left: 12px;
  }
  .comments-footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    height: 46px;
    border-top: 1px solid #ccc;
    text-align: center;
    .comments-btn {
      width: 90%;
    }
  }
}
</style>
