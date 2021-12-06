<template>
  <div class='my-container'>
    <van-cell-group class="my-info" v-if="user">
      <van-cell class="user-info" center :border="false">
        <template #icon>
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="userInfo.photo"
          />
        </template>
        <template #title>
          <span>{{ userInfo.name }}</span>
        </template>
        <template #right-icon>
          <van-button
            round
            class="edit-btn"
            @click="$router.push('/user/profile')"
          >
            编辑资料
          </van-button>
        </template>
      </van-cell>
      <van-grid class="data-info border" :border="false">
        <van-grid-item class="data-info-item">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="title">头条</span>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span>关注</span>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span>粉丝</span>
        </van-grid-item>
        <van-grid-item class="data-info-item">
          <span class="count">{{ userInfo.like_count }}</span>
          <span>获赞</span>
        </van-grid-item>
      </van-grid>
    </van-cell-group>

    <div class="no-login" v-else @click="$router.push({name: 'login',query: {redirect: '/my'}})">
      <van-image
        class="no-login-img"
        width="70"
        height="70"
        :src="require('./no-login.png')"
      >
      </van-image>
      <div class="no-login-text">
        登录/注册
      </div>
    </div>

    <van-grid :column-num="2" class="nav-grid border" :border="false">
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="shoucang" text="收藏" />
      <van-grid-item class="nav-grid-item" icon-prefix="toutiao" icon="lishi" text="历史" />
    </van-grid>
    <van-cell class="border definedHeight imformation" title="消息通知"/>
    <van-cell class="border definedHeight" title="小智同学"/>
    <van-cell
      v-if="user"
      class="logout definedHeight"
      title="退出登录"
      @click="onLogout"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user.js'
export default {
  name: 'myIndex', // name
  components: {
  },
  props: {
  },
  data () {
    return {
      userInfo: {} // 当前用户的登录信息
    }
  },
  methods: {
    // 获取用户登录信息
    async loadGetUserInfo () {
      const ret = await getUserInfo()
      this.userInfo = ret.data.data
    },

    // 用户点击退出登录按钮
    onLogout () {
      this.$dialog.confirm({
        title: '退出提示',
        message: '确定退出登录吗'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created () {
    this.loadGetUserInfo()
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
.my-container {
  .my-info {
    background: url('./banner.png') no-repeat;
    box-sizing: border-box;
    background-size: cover;
    .user-info {
      height: 116px;
      background-color: unset;
      box-sizing: border-box;
      .avatar {
        width: 68px;
        height: 68px;
        // margin-top: 36px;
        border: 1px solid #fff;
      }
      /deep/ .van-cell__title {
        font-size: 16px;
        color: #fff;
        padding-left: 16px;
      }
      .edit-btn {
        // width: 58px;
        height: 16px;
        font-size: 10px;
        color: #666
      }
    }
    .data-info {
      height: 66px;
      box-sizing: border-box;
      .data-info-item {
        height: 66px;
        font-size: 16px;
        color: #fff;
        /deep/ .van-grid-item__content {
          background-color: unset;
          /deep/ .count {
            padding-top: 16px;
            padding-bottom: 10px;
          }
        }
      }
    }
  }

  .no-login {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: url('./banner.png') no-repeat;
    background-size: cover;
    height: 180px;
    box-sizing: border-box;
    .no-login-img {
      margin-top: 54px;
    }
    .no-login-text {
      font-size: 14px;
      color: #fff;
      margin-top: 8px;
    }
  }

  .nav-grid {
    height: 70px;
    box-sizing: border-box;
    /deep/ .toutiao-shoucang::before {
      color:#eb5253;
      font-size: 24px;
    }
    /deep/ .toutiao-lishi::before {
      color:#ff9d1d;
      font-size: 24px;
    }
    /deep/ .van-grid-item__text {
      font-size: 16px;
      color: #333;
    }
  }
  .imformation {
    margin-top: 24px;
  }
  .logout {
    height: 50px;
    font-size: 14px;
    color: #d86262;
    .van-cell__title {
      display: flex;
      justify-content: center;
    }
  }
  .border {
    margin-bottom: 4px;
  }
  .definedHeight {
    height: 50px;
  }
}
</style>
