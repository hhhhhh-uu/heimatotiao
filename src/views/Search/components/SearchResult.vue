<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败,点击重新加载"
      @load="onLoad"
    >
      <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
        :to="{
          name: 'article',
          params: {
            articleId: article.art_id
          }
        }"
      />
    </van-list>
  </div>
</template>

<script>
import { getresultAPI } from '@/api'
export default {
  name: 'SearchResult',
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getresultAPI({
          page: this.page,
          per_page: this.perPage,
          q: this.keyword
        })
        const { results } = data.data
        this.list.push(...results)
        this.loading = false
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
:deep(.search) {
  padding-top: 106px;
  :deep(.van-search) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  .van-search__action {
    color: #fff;
  }
}
</style>
