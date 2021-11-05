<template>
  <div class='search-history'>
    <van-cell title="历史记录">
      <van-icon name="delete-o"
        v-if="!deleteShow"
        @click="deleteShow=!deleteShow"
      />
      <div v-else>
        <span
          class="deleteText"
          @click="$emit('history', [])"
        >全部删除</span>
        <span @click="deleteShow=false">完成</span>
      </div>
    </van-cell>
    <van-cell
      v-for="(history, index) in historyList"
      :key="index"
      :title="history"
      @click="deleteHistory(history, index)"
    >
      <van-icon
        v-show="deleteShow"
        slot="right-icon"
        name="close"
      >
      </van-icon>
    </van-cell>
  </div>
</template>

<script>
import { setStorage } from '@/utils/storage'
export default {
  name: 'SearchHistoryIndex',
  components: {
  },
  props: {
    historyList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      deleteShow: false
    }
  },
  methods: {
    deleteHistory (history, index) {
      if (this.deleteShow) {
        this.historyList.splice(index, 1)
        setStorage('history-list', this.historyList)
      } else {
        this.$emit('search', history)
      }
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
.search-history {
  .van-cell__value {
    .deleteText {
      margin-right: 10px;
    }
  }
}
</style>
