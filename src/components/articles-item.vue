<template>
  <div class='articles-item'>
    <van-cell
      :title="article.title"
      :to="{
        name: 'article',
        params: {
          articleId: article.art_id
        }
      }">
      <template slot="label">
        <div class="images-wrap" v-if="article.cover.type===3">
          <div class="img-item" v-for="(img, index) in article.cover.images" :key="index">
            <van-image
              class="img"
              :src="img"
            />
          </div>
        </div>
        <div>
          <span class="margin-ringht">{{ article.aut_id }}</span>
          <span class="margin-ringht">{{ article.comm_count }}评论</span>
          <span class="margin-ringht">{{ article.pubdate | relativeTime }}</span>
        </div>
      </template>
      <template v-if="article.cover.type===1" slot="default">
        <van-image
          :src="article.cover.images[0]"
        />
      </template>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticlesItem',
  components: {
  },
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
    }
  },
  methods: {
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
.articles-item {
  .images-wrap {
    display: flex;
    .img-item {
      &:not(:last-child) {
        padding-right: 4px;
      }
      .img {
        height: 74px;
      }
    }
  }
  .van-cell {
    color: #333;
    font-size: 15px;
    .van-cell__label {
      font-size: 12px;
      color: #B4B4B4;
      .margin-ringht {
        margin-right: 14px;
      }
    }
    .van-cell__value {
      flex: unset;
      width: 120px;
      height: 80px;
    }
  }
}
</style>
