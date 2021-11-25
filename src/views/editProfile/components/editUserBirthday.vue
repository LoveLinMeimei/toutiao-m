<template>
  <div class='userBirthday'>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onFirmBirthday"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'UserBirthday',
  components: {
  },
  props: {
    birthday: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(Date.now()),
      currentDate: new Date(this.birthday)
    }
  },
  methods: {
    async onFirmBirthday () {
      this.$toast.loading({
        message: '修改中',
        forbidClick: true
      })
      // 请求数据
      const updateBirthday = `${this.currentDate.getFullYear()}-${this.currentDate.getMonth() + 1}-${this.currentDate.getDate()}`
      await editUserProfile({
        birthday: updateBirthday // 格式'2018-12-20'
      })
      // 更新父组件的数据
      this.$emit('update:birthday', updateBirthday)
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
</style>
