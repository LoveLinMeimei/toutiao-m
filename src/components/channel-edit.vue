<template>
  <div class='channel-edit-container'>
    <van-cell title="我的频道" center :border="false">
      <van-button
        type="danger"
        round
        @click="editActive=!editActive"
      >{{ editActive ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid class="channel" :gutter="10">
      <van-grid-item
        v-for="(channel, index) in userChannels"
        :key="channel.id"
        class="channel-item"
        @click="onChannelActiveOrDelete(channel, index)"
      >
        <span class="text" :class="active===index ? 'active-red' : ''">{{ channel.name }}</span>
        <van-icon name="cross" v-show="editActive && index!==0" class="edit-active"></van-icon>
      </van-grid-item>
    </van-grid>

    <van-cell title="推荐频道"
      class="recommendChannel"
      center
      :border="false"
    ></van-cell>
    <van-grid class="channel" :gutter="10">
      <van-grid-item
        v-for="channel in recommendChannels"
        :key="channel.id"
        class="channel-item"
        :text="channel.name"
        @click="onRecommendChannels(channel)"
      >
        <span class="text">{{ channel.name }}</span>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, addUserChannels, deleteChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setStorage } from '@/utils/storage'
export default {
  name: 'ChannelEditIndex',
  components: {
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      // 我的频道活跃index
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道列表
      editActive: false // 是否编辑状态
    }
  },
  methods: {
    // 加载所有的频道列表
    async loadAllChannels () {
      /* let channels = []
      if (this.user) {
        // 已登录，请求获取线上的频道数据
        console.log('1111')
        const { data } = await getAllChannels()
        channels = data.data.channels
      } else {
        // 未登录
        const localChannels = getStorage('user-channels')
        if (localChannels) {
          // 有本地频道数据，则使用
          console.log('2222')
          channels = localChannels
          console.log(channels)
        } else {
          // 没有本地频道数据，则请求获取默认推荐的频道列表
          console.log('333')
          const { data } = await getAllChannels()
          channels = data.data.channels
        }
      }
      // 将数据更新到组件中
      this.allChannels = channels */
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },

    // 点击我的频道，分两种情况
    // 第一种：编辑处于活跃状态时，点击我的频道时删除
    //  第二种： 编辑处于不活跃状态时，点击我的频道跳转到我的文章列表
    onChannelActiveOrDelete (channel, index) {
      if (this.editActive) {
        // 执行删除操作
        this.deleteChannel(channel, index)
      } else {
        // 非编辑状态,执行切换频道
        // 关闭弹出层 弹出层的显示状态在父组件
        this.$emit('close')
        // 把我的频道的index发送给父组件的active
        this.$emit('channelActive', index)
      }
    },

    // 删除操作
    async deleteChannel (channel, index) {
      if (index !== 0) {
        // 如果要删除的index在active之前,active会-1
        if (index <= this.active) {
          this.$emit('input', this.active - 1)
        }
        this.userChannels.splice(index, 1)
        // 执行数据持久化
        if (this.user) {
          // 已登录,删除线上数据
          await deleteChannels(channel.id)
        } else {
          // 未登录，持久化到本地
          setStorage('user-channels', this.userChannels)
        }
      }
    },

    async onRecommendChannels (channel) {
      // 把我的推荐列表添加到我的频道上
      this.userChannels.push(channel)
      if (this.user) {
        // 已登录,将数据存储到线上
        await addUserChannels([{
          id: channel.id,
          seq: this.userChannels.length
        }])
      } else {
        // 未登录,将数据存储到本地
        setStorage('user-channels', this.userChannels)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      return this.allChannels.filter(item => {
        return !this.userChannels.find(channel => {
          return item.id === channel.id
        })
      })
    }
  },
  created () {
    this.loadAllChannels()
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
.channel-edit-container {
  padding-top: 54px;
  .van-cell__title {
    font-size: 18px;
    color: #333;
  }
  .van-cell__value {
    .van-button {
      background-color: #fff;
      // width: 52px;
      height: 24px;
      color: #f86060;
      .van-button__content {
        // width: 52px;
        // height: 24px;
        // color: #f86060;
        font-size: 11px;
      }
    }
  }
  .channel {
    margin-top: 5px;
    .channel-item {
      /deep/ .van-grid-item__content {
        background-color: #f4f5f6;
        height: 50px;
        .text {
          font-size: 14px;
          color: #222;
        }
        .active-red {
          color: red
        }
      }
      .edit-active {
        position: absolute;
        top: -5px;
        right: -5px;
        color: #666;
        font-size: 15px;
      }
    }
  }
  .recommendChannel {
    padding: 15px;
  }
}
</style>
