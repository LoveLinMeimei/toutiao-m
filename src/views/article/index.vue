<template>
  <div class='article-container'>
    <van-nav-bar
      title="文章详情"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="detail">
      <h3 class="title">{{ detailList.title }}</h3>
      <van-cell class="author" center>
        <van-image
          slot="icon"
          round
          :src="detailList.aut_photo"></van-image>
        <span slot="title">{{ detailList.aut_name }}</span>
        <span slot="label">{{ detailList.pubdate }}</span>
        <van-button
          :type="detailList.is_followed ? 'info' : 'default'"
          round
          :icon="detailList.is_followed ? 'plus' : ''"
          :loading="followLoading"
          @click="switchFollowed(detailList.aut_id, detailList.is_followed)"
        >
          {{detailList.is_followed ? '关注' : '取消关注'}}
        </van-button>
      </van-cell>
      <div
        class="markdown-body"
        v-html="detailList.content"
        ref="article-content"
      >
      </div>
      <van-divider dashed>正文结束</van-divider>
      <span class="all-comments-text">全部评论</span>
      <comments-list
        :list="list"
        :articleId="articleId"
        @openPopup="openCommentsPopup"
        @updata-total-count="totalCount=$event"
      />
    </div>
    <!-- 底部 -->
    <div class="footer">
      <van-button
        round
        type="default"
        @click="toggleShowPopup=true"
      >写评论</van-button>
      <van-icon
        size="20"
        name="comment-o"
        :badge="totalCount"
      />
      <van-icon size="20"
        :color="detailList.is_collected ? 'red' : '#333'"
        :name="detailList.is_collected ? 'star' : 'star-o'"
        @click="onCollect()"
      />
      <van-icon
        size="20"
        :color="detailList.attitude === 1 ? 'red' : '#333'"
        :name="detailList.attitude === 1 ? 'good-job' : 'good-job-o'"
        @click="onDislike()"
      />
      <van-icon size="20" name="share-o" />
    </div>
    <!-- /底部 -->

    <!-- 发布评论 -->
    <van-popup v-model="toggleShowPopup" position="bottom">
      <comments-post
        @post-comments="postComments"
        :target="articleId"
      ></comments-post>
    </van-popup>
    <!-- /发布评论 -->

    <!-- 评论回复 -->
      <van-popup
        v-model="toggleCommentsShowPopup"
        position="bottom"
        :style="{ height: '90%' }"
      >
        <!-- 这里使用v-if的目的是让组件随着弹出层的显示进行渲染和销毁，防止加载过的组件不重新渲染导致数据不会重新加载的问题 -->
        <comments-reply
          v-if="toggleCommentsShowPopup"
          :commentsItem="commentsItem"
          :articleId="articleId"
          @showPopupComments="toggleShowPopup=true"
          @close="toggleCommentsShowPopup=false"
        >
        </comments-reply>
      </van-popup>
      <!-- /评论回复 -->
  </div>
</template>

<script>
// 在组件中获取动态路由参数
// 方式一：this.$route.params.articleId
// 方式二：props传参，推荐 this.articleId
import { getActileDetail, followUser, unFollowUser } from '@/api/user'
import { addCollect, delCollect, addDislikesArticle, delDislikesArticle } from '@/api/articles'

import CommentsList from './components/comments-list'
import CommentsPost from './components/comments-post.vue'
import CommentsReply from './components/comments-reply.vue'

import { ImagePreview } from 'vant'

import './github-markdown.css'
export default {
  name: 'articleIndex',
  components: {
    CommentsList,
    CommentsPost,
    CommentsReply
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      detailList: {},
      list: [], // 文章评论列表
      followLoading: false, // 关注的loading状态
      toggleShowPopup: false, // 评论弹出层的展示
      toggleCommentsShowPopup: false, // 回复评论弹出层
      commentsItem: {}, // 回复评论的每一项
      totalCount: 0 // 总的评论数
    }
  },
  methods: {
    async loadActicleDetail () {
      const { data } = await getActileDetail(this.articleId)
      this.detailList = data.data

      // 数据影响视图的更新不是立即的，数据更新了DOM不一定立刻更新，需要用this.$nextTick()才可以立马更新视图
      this.$nextTick(() => {
        this.previewImage()
      })
    },

    // 预览图片
    previewImage () {
      // 1.获取文章的DOM节点
      const contentDom = this.$refs['article-content']
      // 2.获取所有img图片
      const allImage = contentDom.querySelectorAll('img')
      const imgPath = []
      allImage.forEach((item, index) => {
        imgPath.push(item.src)
        // 3.给每个img点击事件
        item.onclick = function () {
          // 4.设置ImagePrevie
          ImagePreview({
            images: imgPath,
            startPosition: index
          })
        }
      })
    },

    // 切换关注/取消关注
    async switchFollowed (userId, follow) {
      this.followLoading = true
      try {
        if (follow) {
          // 取消关注
          await unFollowUser(userId)
        } else {
          // 关注
          await followUser(userId)
        }
        this.detailList.is_followed = !this.detailList.is_followed
      } catch (err) {
        this.$toast.fail('操作失败')
      }
      this.followLoading = false
    },

    // 切换收藏图标
    async onCollect () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        if (this.detailList.is_collected) {
          // 取消收藏
          await delCollect(this.articleId)
          this.$toast.success('取消收藏')
        } else {
          // 添加收藏
          await addCollect(this.articleId)
          this.$toast.success('添加收藏')
        }
        this.detailList.is_collected = !this.detailList.is_collected
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },

    // 切换点赞图标
    async onDislike () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        // attitude   -1: 无态度，0-不喜欢，1-点赞
        if (this.detailList.attitude === 1) {
          // 取消点赞
          await delDislikesArticle(this.articleId)
          this.detailList.attitude = 0
          this.$toast.success('取消点赞')
        } else {
          // 添加点赞
          await addDislikesArticle(this.articleId)
          this.detailList.attitude = 1
          this.$toast.success('点赞成功')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },

    // 发布文章评论
    postComments (newObj) {
      // console.log(newObj)
      // 关闭发布评论弹出层
      this.toggleShowPopup = false
      // 把发布成功的评论数据对象放到评论列表顶部
      this.list.unshift(newObj)
      // 更改评论总数
      this.totalCount++
    },

    // 点击回复评论
    openCommentsPopup (commentsItem) {
      // 展示回复内容
      this.toggleCommentsShowPopup = true
      // 把评论的信息放到data中，方便等一下传给子组件comments-reply
      this.commentsItem = commentsItem
    }
  },
  computed: {
  },
  created () {
    this.loadActicleDetail()
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
// @import url('./github-markdown.css');
.article-container {
  background-color: #fff;
  /deep/ .van-nav-bar {
    .van-nav-bar__content {
      background-color: #3296fa;
      .van-icon {
        color: #fff
      }
      .van-nav-bar__title {
        color: #fff
      }
    }
  }
  .detail {
    position: fixed;
    top: 46px;
    bottom: 45px;
    left: 0px;
    right: 0px;
    overflow-y: scroll;
    padding: 0 12px;
    background-color: #fff;
    .title {
      font-size: 16px;
      color: #333
    }
    .author {
      padding: 10px 0px;
      // padding-right: 0px;
      /deep/ .van-image__img {
        width: 38px;
        height: 38px;
        margin-left: 5px;
        margin-right: 8px;
      }
      .van-cell__title {
        font-size: 12px;
        color: #3a3a3a;
      }
      .van-cell__label {
        font-size: 10px;
      }
      .van-cell__value {
        .van-button {
          width: 86px;
          height: 30px;
          .van-button__text {
            font-size: 13px;
          }
        }
      }
    }
    .all-comments-text {
      font-size: 13px;
      margin-left: 12px;
    }
  }
  .footer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    height: 44px;
    background-color: #fff;
    display: flex;
    align-items: center;
    .van-button {
      margin-left: 20px;
      margin-right: 20px;
      width: 160px;
      height: 30px;
      color: #323233;
      font-size: 11px;
    }
    .van-icon {
      flex: 1;
      .van-info {
        right: 17px;
      }
    }
  }
}
</style>
