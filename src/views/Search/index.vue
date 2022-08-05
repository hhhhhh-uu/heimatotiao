<template>
  <div>
    <form action="/">
      <van-search
        v-model.trim="keyword"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
      />
    </form>
    <!-- <search-suggestion></search-suggestion>
    <search-result></search-result>
    <search-history></search-history> -->
    <component :is="componentName" :keyword="keyword"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  name: 'Search',
  data() {
    return {
      keyword: '',
      isShowSearchResult: false
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  computed: {
    componentName() {
      if (this.keyword === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    onSearch() {
      console.log('搜索了')
      this.isShowSearchResult = true
    },
    onSearchFocus() {
      this.isShowSearchResult = false
    }
  }
}
</script>

<style scoped lang="less">
.search {
  :deep(.van-search__action) {
    color: #fff;
  }
}
</style>
