<template>
  <div class='userGender'>
    <van-picker
      show-toolbar
      :columns="gender"
      :defaultIndex="localUserGender"
      @cancel="$emit('close')"
      @confirm="onConfirmGender"
      @change="onChange"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'UserGender',
  components: {
  },
  props: {
    userGender: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      gender: ['男', '女'],
      localUserGender: this.userGender
    }
  },
  methods: {
    async onConfirmGender () {
      this.$toast.loading({
        message: '修改中',
        forbidClick: true
      })
      // 请求数据
      await editUserProfile({
        gender: this.localUserGender
      })
      // 更新父组件的数据
      this.$emit('update:userGender', this.localUserGender)
      this.$toast.success('修改成功')
      // 关闭弹出层
      this.$emit('close')
    },

    onChange (picker, value, index) {
      this.localUserGender = index
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
.userGender {
}
</style>
