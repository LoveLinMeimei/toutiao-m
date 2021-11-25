<template>
  <div class='user-profile'>
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file"
      ref="file"
      hidden
      @change="clickPhoto"
    >
    <van-cell
      title="头像"
      is-link
      center
      @click="$refs.file.click()"
    >
      <van-image
        width="30"
        height="30"
        round
        :src="user.photo"
      />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="editUserName=true"
    />
    <van-cell
      title="性别"
      :value="user.gender===0 ? '男' : '女'"
      is-link
      @click="editUsergender=true"
    />
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="editUserBirthday=true"
    />
    <!-- 修改昵称 -->
    <van-popup
      v-model="editUserName"
      position="bottom"
      :style="{ height: '25%' }"
    >
      <!--
        如果需要在子组件中使用数据，又需要修改它，可以使用v-model绑定数据
        v-model = 1. :value="数据" 向子组件传递一个value的值
                  2. @input=""  子组件向父组件发送一个input的事件
        v-model只能用一次
        也可以用:
        :xxxx.sync="" = 1. 子组件向父组件this.$emit('update:xxxx')的事件
                        2. 父组件向子组件传递一个:xxxx=""的值
       -->
      <edit-user-name
        v-model="user.name"
        @close="editUserName=false"
      />
      <!-- <edit-user-name
        :userName="user.name"
        @close="editUserName=false"
        @updata-name="user.name=$event"
      /> -->
    </van-popup>
    <!-- /修改昵称 -->

    <!-- 修改性别 -->
    <van-popup
      v-model="editUsergender"
      position="bottom"
      round
    >
      <edit-user-gender
        v-if="editUsergender"
        :userGender.sync="user.gender"
        @close="editUsergender=false"
      />
    </van-popup>
    <!-- /修改性别 -->

    <!-- 修改生日 -->
    <van-popup
      v-model="editUserBirthday"
      position="bottom"
    >
      <edit-user-birthday
        :birthday.sync="user.birthday"
        @close="editUserBirthday=false"
      />
    </van-popup>
    <!-- /修改生日 -->

    <!-- 修改头像 -->
    <van-popup
      v-model="editUserPhoto"
      position="bottom"
      :style="{ height: '100%', 'background-color': '#000'}"
    >
      <edit-user-photo
        @close="editUserPhoto=false"
        :file="file"
        @updata-userphoto="user.photo=$event"
      />
    </van-popup>
    <!-- /修改头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import editUserName from './components/editUserName.vue'
import editUserGender from './components/editUserGender.vue'
import editUserBirthday from './components/editUserBirthday.vue'
import editUserPhoto from './components/editUserPhoto.vue'

export default {
  name: 'UserProfileIndex',
  components: {
    editUserName,
    editUserGender,
    editUserBirthday,
    editUserPhoto
  },
  props: {
  },
  data () {
    return {
      user: {},
      editUserName: false,
      editUsergender: false,
      editUserBirthday: false,
      editUserPhoto: false,
      file: null
    }
  },
  methods: {
    // 获取用户个人资料
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    },

    // 点击头像
    clickPhoto () {
      this.file = this.$refs.file.files[0]
      // this.blob = window.URL.createObjectURL(file)
      this.editUserPhoto = true
      // 解决点击相同图片不更新问题
      this.$refs.file.value = ''
    }
  },
  computed: {
  },
  created () {
    this.loadUserProfile()
  },
  mounted () {
  },
  watch: {
  }
}
</script>
<style scoped lang="less">
.user-profile {
  /deep/ .van-nav-bar {
    background-color: #3196fa;
    .van-icon {
      color: #fff
    }
    .van-nav-bar__title {
      color: #fff
    }
  }
}
</style>
