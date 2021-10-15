<template>
  <div class='login-container'>
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <van-form
      :show-error="false"
      :show-error-message="false"
      validate-first
      ref="login-form"
      @submit="onLogin"
      @failed="onFail"
    >
      <van-field
        v-model="user.mobile"
        name="mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
        :rules="loginRules.mobile"
      >
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
        :rules="loginRules.code"
      >
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isShowCountDown"
            @finish="isShowCountDown=false"
          />
          <van-button
            class="send-btn"
            size="mini"
            slot="button"
            round
            v-else
            :loading="isSendSmsLoading"
            @click.prevent="onSendSmd"
          >获取验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button
          class="login-btn"
          type="info"
          block
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, sendSmd } from '@/api/user'
export default {
  name: 'loginIndex',
  components: {
  },
  props: {
  },
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isShowCountDown: false, // 倒计时跟发送验证码的显示状态
      isSendSmsLoading: false, // 验证码的loading状态
      // 处理验证规则
      loginRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的手机格式' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /\d{6}/, message: '请输入正确的验证码格式' }
        ]
      }
    }
  },
  methods: {
    async onLogin () {
      /*
        点击登录:
        显示loading状态 -> 发送数据给后端 -> 存储token
        toast默认只能显示一个
      */
      this.$toast.loading({
        message: '登录中...',
        forbidClick: true, // 是否禁止背景点击
        duration: 0 // 持续时间，0表示持续展示不停止
      })
      try {
        const user = await login(this.user)
        // 把touken存在Vuex的好处：获取方便还能响应式
        this.$store.commit('setUser', user.data.data)
        this.$toast({
          type: 'success',
          message: '登录成功',
          position: 'top'
        })
        this.$router.back()
      } catch (err) {
        this.$toast({
          type: 'fail',
          message: '无效的手机号或验证码',
          position: 'top'
        })
      }
    },

    // 发送验证码
    async onSendSmd () {
      /*
        点击发送验证码步骤：
        1.校验手机号 -> 显示loading状态 -> 通过接口发送验证码给后端 -> 显示倒计时 -> 不管最后结果怎么样都要关闭计时器
        2. try{}catch() {}由于错误的结果最后都会到catch里面，所以需要判断一种手机号错误，还有后端返回的数据错误
        3. 不管最后验证码对不对都需要关闭定时器，显示验证码按钮，把loaing状态关闭
      */
      try {
        // 验证手机号码
        await this.$refs['login-form'].validate('mobile')
        this.isSendSmsLoading = true
        // 发送验证码给后端
        await sendSmd(this.user.mobile)
        // 显示出计时器
        this.isShowCountDown = true
      } catch (err) {
        // console.dir(err)
        let message = ''
        if (err.name === 'mobile') {
          message = err.message
        } else if (err && err.response && err.response.status === 429) {
          message = '发送太频繁了，请稍后重试'
        } else {
          // 未知错误
          message = '发送失败，请稍后重试'
        }
        this.$toast({
          message,
          position: 'top'
        })
      }

      // 无论发送验证码成功还是失败，最后都要关闭发送按钮的loading状态
      this.isSendSmsLoading = false
      // 发送失败，显示发送按钮，关闭倒计时
      this.isShowCountDown = false
    },

    // 表单验证不通过，自定义提示
    onFail (err) {
      this.$toast({
        message: err.errors[0].message,
        position: 'top'
      })
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
.login-container {
  .van-cell-group {
    padding: 0 16px;
  }
  .send-btn {
    width: 80px;
    height: 24px;
    border-color: #ededed;
    .van-button__text {
      font-size: 12px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px 0px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
