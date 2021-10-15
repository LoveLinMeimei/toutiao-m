<template>
  <div class='home-container'>
    <van-nav-bar class="my-nav-bar">
      <template #title>
        <van-button class="search-btn" icon="search" round type="info">搜索</van-button>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
export default {
  name: 'homeIndex',
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  methods: {
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
</style>
