<template>
  <van-cell class='comments-item'>
    <van-image
      class="img"
      slot="icon"
      round
      :src="commentsItem.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="title">
        <span class="text">{{ commentsItem.aut_name }}</span>
        <div @click="onLike" class="dianzan">
          <van-icon
            class="icon"
            :name="commentsItem.is_liking ? 'good-job' : 'good-job-o'"
            :color="commentsItem.is_liking ? '#e5645f' : ''"
          />
          <span class="num">{{ commentsItem.like_count ? commentsItem.like_count : '赞' }}</span>
        </div>
      </div>
      <div class="content">
        {{ commentsItem.content }}
      </div>
      <div class="time-wrap">
        <div class="pubtime">{{ commentsItem.pubdate | dataTime('MM-DD HH:mm') }}</div>
        <div class="reply" v-if="showReply">
          <van-button size="small"
            round
            type="default"
            @click="$emit('openPopup', commentsItem)"
          >
            <span>{{ commentsItem.reply_count }}</span>
            回复
          </van-button>
        </div>
      </div>

    </div>
  </van-cell>
</template>

<script>
import { giveLikingsComments, cancelLikingsComments } from '@/api/comments.js'
export default {
  name: 'commentsItemIndex',
  components: {
  },
  props: {
    commentsItem: {
      type: Object,
      required: true
    },
    showReply: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 评论点赞
    async onLike () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      const commentId = this.commentsItem.com_id.toString()
      if (this.commentsItem.is_liking) {
        // 取消点赞
        await cancelLikingsComments(commentId)
        this.commentsItem.like_count--
      } else {
        // 点赞
        await giveLikingsComments(commentId)
        this.commentsItem.like_count++
      }
      this.commentsItem.is_liking = !this.commentsItem.is_liking
      this.$toast.success(this.commentsItem.is_liking ? '点赞成功' : '取消点赞成功')
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
.comments-item {
  .img {
    width: 36px;
    height: 36px;
    margin-right: 12px;
  }
  .title-wrap {
    .title {
      display: flex;
      justify-content: space-between;
      .text {
        font-size: 14px;
        color: #406599;
      }
      .dianzan {
        width: 32px;
        .icon {
          margin-right: 5px;
        }
        .num {
          font-size: 12px;
        }
      }
    }
    .time-wrap {
      display: flex;
      flex: 1;
      align-items: center;
      .pubtime {
        margin-right: 8px;
      }
      .reply {
        display: flex;
        .van-button {
          height: 22px;
          width: 65px;
        }
      }
    }
  }
}
</style>
