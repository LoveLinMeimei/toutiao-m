<template>
  <div class='userPhoto'>
    <img
      :src="image"
      ref="image"
    />
    <van-nav-bar
      class="footer-navBar"
      left-text="取消"
      right-text="确认"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'

import { editUserPhoto } from '@/api/user'

export default {
  name: 'UserPhoto',
  components: {
  },
  props: {
    file: {
      // type: String,
      required: true
    }
  },
  data () {
    return {
      image: window.URL.createObjectURL(this.file),
      myCropper: null // 裁切器实例
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '更新中',
        forbidClick: true,
        duration: 0
      })
      const file = await this.getCroppedCanvas()
      const fd = new FormData()
      fd.append('photo', file)
      await editUserPhoto(fd)
      this.$emit('updata-userphoto', window.URL.createObjectURL(file))
      this.$emit('close')
      this.$toast.success('更新成功')

      /* 无裁剪器的情况下
      // 因为Content-Type参数的值为multipart/form-data所以需要提交FormData数据对象，专门用于文件上传的，不能提交{}
      const fd = new FormData()
      fd.append('photo', this.file)
      await editUserPhoto(fd)
      // 把图片发送给父组件以更新父组件
      this.$emit('updata-userphoto', this.image)
      // 关闭弹出层
      this.$emit('close')
      this.$toast.success('更新成功')
      */
    },

    getCroppedCanvas () {
      return new Promise(resolve => {
        this.myCropper.getCroppedCanvas().toBlob(blob => {
          resolve(blob)
        })
      })
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.myCropper = new Cropper(this.$refs.image, {
      viewMode: 1,
      dragMode: 'none',
      initialAspectRatio: 1,
      aspectRatio: 1,
      preview: '.before',
      background: false,
      autoCropArea: 0.6,
      zoomOnWheel: false
    })
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
.userPhoto {
  /deep/ .footer-navBar {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    .van-nav-bar__content {
      background-color: #000;
    }
  }
}
</style>
