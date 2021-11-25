<template>
  <div class='userName'>
    <van-nav-bar
      title="昵称"
      left-text="取消"
      right-text="完成"
      :border='false'
      @click-left="$emit('close')"
      @click-right="onChangeUserName"
    />
    <div class="intro-field-wrap">
      <van-field
        class="field-wrap"
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="20"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'

export default {
  name: 'UserName',
  components: {
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onChangeUserName () {
      this.$toast.loading({
        message: '修改中',
        forbidClick: true
      })
      // 请求数据
      await editUserProfile({
        name: this.localName
      })
      // 更新父组件的数据
      this.$emit('input', this.localName)
      // this.$emit('updata-name', this.localName)
      this.$toast.success('修改成功')
      // 关闭弹出层
      this.$emit('close')
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
.userName {
  background-color: #f5f7f9;
  height: 100%;
  /deep/ .van-nav-bar {
    .van-nav-bar__content {
      background-color: #fff;
      .van-nav-bar__title {
        color: #333;
      }
    }
  }
  .intro-field-wrap {
    // background-color: #f5f7f9;
    padding: 10px 10px 0px 10px;
  }
}
</style>
