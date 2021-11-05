<template>
  <div class='home-container'>
    <van-nav-bar class="my-nav-bar">
      <template #title>
        <van-button
          class="search-btn"
          icon="search"
          round
          type="info"
          to="/search"
        >搜索</van-button>
      </template>
    </van-nav-bar>

    <van-tabs
      class="articles-tabs"
      v-model="active"
      title-inactive-color="#7d7e80"
      title-active-color="#323233"
      background="#fff"
    >
      <van-tab
        class="tabs-item"
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <articles-list
          class="articles-channel"
          :channel="channel"
        ></articles-list>
      </van-tab>
      <div class="tab-placeholder" slot="nav-right"></div>
      <van-icon
        class="tabs-hanbao"
        slot="nav-right"
        name="wap-nav"
        @click="showPopup=true"
      >
      </van-icon>
    </van-tabs>
    <!-- 频道编辑弹窗 -->
    <van-popup
      v-model="showPopup"
      position="bottom"
      round
      closeable
      close-icon-position="top-left"
      get-container="body"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :userChannels="channels"
        :active="active"
        @channelActive="active = $event"
        @close="showPopup=false"
        @input="active=$event"
      ></channel-edit>
    </van-popup>
  </div>
</template>

<script>
import ArticlesList from '@/components/articles-list'
import { getUserChannels } from '@/api/articles'
import ChannelEdit from '@/components/channel-edit'
import { mapState } from 'vuex'
import { getStorage } from '@/utils/storage'
export default {
  name: 'homeIndex',
  components: {
    ArticlesList,
    ChannelEdit
  },
  props: {
  },
  data () {
    return {
      channels: [], // 文章频道
      showPopup: false, // 显示弹窗的显示和隐藏
      active: 0 // 文章频道活跃index
    }
  },
  methods: {
    async loadUserChannels () {
      /* const { data } = await getUserChannels()
      this.channels = data.data.channels */

      let channels = []
      if (this.user) {
        // 已登录，请求获取线上的频道数据
        const { data } = await getUserChannels()
        channels = data.data.channels
      } else {
        // 未登录
        const localChannels = getStorage('user-channels')
        if (localChannels) {
          // 有本地频道数据，则使用
          channels = localChannels
        } else {
          // 没有本地频道数据，则请求获取默认推荐的频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        }
      }
      // 将数据更新到组件中
      this.channels = channels
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadUserChannels()
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
.home-container {
  .my-nav-bar {
    height: 48px;
    background-color: #3296fa;
    /deep/ .van-nav-bar__title {
      max-width: unset;
      .van-button--info {
        width: 268px;
        height: 34px;
        background-color: #5babfb;
        border: none;
        .van-icon-search {
          font-size: 16px;
          color: #fff
        }
        .van-nav-bar__title {
          font-size: 14px;
        }
      }
    }
  }
  .articles-tabs {
    /deep/ .van-tab {
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/ .van-tabs__line {
      bottom: 20px;
      width: 15px !important;
      height: 3px;
      background: #3296fa;
    }
    .articles-channel {
      position: fixed;
      left: 0;
      right: 0px;
      top: 90px;
      bottom: 50px;
      overflow-y: auto;
    }
  }
  .tab-placeholder {
    flex-shrink: 0;
    width: 24px;
  }
  .tabs-hanbao {
    position: fixed;
    right: 0px;
    font-size: 26px;
    line-height: 43px;
    background-color: #fff;
    opacity: 0.8;
    color: #666;
  }
}
</style>
