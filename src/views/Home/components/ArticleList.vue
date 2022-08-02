<template>
  <div>
    <van-pull-refresh
      v-model="refreshLoading"
      success-text="刷新成功"
      @refresh="loadNextPageArticle"
    >
      <van-list
        v-model="loading"
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
        :error.sync="error"
        error-text="加载文章失败.请点击重新加载"
        :finished="isFinished"
        finished-text="没有更多文章了~~"
      >
        <Articleltem
          v-for="item in articles"
          :key="item.art_id"
          :articleInfo="item"
        ></Articleltem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleAIP } from '@/api'
import Articleltem from '@/components/Articleltem.vue'
export default {
  name: 'ArticleList',
  components: {
    Articleltem
  },
  props: {
    id: {
      type: [String, Number],
      recuired: true
    }
  },
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleAIP(this.id, +new Date())
        this.articles = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
        // console.log(data)
      } catch (error) {
        this.$toast.fail('请刷新页面')
      }
    },
    async loadNextPageArticle() {
      try {
        const { data } = await getArticleAIP(this.id, this.pre_timestamp)
        const timestamp = data.data.pre_timestamp
        const results = data.data.results
        if (timestamp === null) {
          this.isFinished = true
        }
        if (this.refreshLoading) {
          this.articles.unshift(...results)
        } else {
          this.articles.push(...results)
        }
        this.pre_timestamp = timestamp
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshLoading = false
      } // console.log(data);
    }
  }
}
</script>

<style></style>
