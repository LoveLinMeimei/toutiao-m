<template>
  <div id="app">
    <!--
      一级路由出口，路由表中所有的顶层路由都是一级路由
      因为router-view是一级路由出口
      keep-alive仅对该路由出口渲染的组件有效
    -->
    <!-- <keep-alive :include="['LayoutIndex']"> -->
    <keep-alive :include="cachePage">
      <router-view/>
    </keep-alive>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['cachePage'])
  }
}
</script>
<style lang="less">
</style>
