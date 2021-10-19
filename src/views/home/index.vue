<template>
  <div class='home-container'>
    <van-nav-bar class="my-nav-bar">
      <template #title>
        <van-button class="search-btn" icon="search" round type="info">搜索</van-button>
      </template>
    </van-nav-bar>

    <van-tabs
      class="articles-tabs"
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
        <articles-list class="articles-channel" :channel="channel"></articles-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ArticlesList from '@/components/articles-list'
import { getUserChannels } from '@/api/articles'
export default {
  name: 'homeIndex',
  components: {
    ArticlesList
  },
  props: {
  },
  data () {
    return {
      channels: [] // 文章频道
    }
  },
  methods: {
    async loadUserChannels () {
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    }
  },
  computed: {
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
}
</style>
