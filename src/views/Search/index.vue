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
        @cancel="$router.back()"
      />
    </form>
    <!-- <search-suggestion></search-suggestion>
    <search-result></search-result>
    <search-history></search-history> -->
    <component
      :is="componentName"
      :keyword="keyword"
      :SearchHistorys="SearchHistorys"
      @clear-search-history="SearchHistorys = []"
      @search="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import { setHEIMA, getHEIMA } from '@/utils/auth'
export default {
  name: 'Search',
  data() {
    return {
      keyword: '',
      isShowSearchResult: false,
      SearchHistorys: getHEIMA() || []
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  },
  watch: {
    SearchHistorys(value) {
      setHEIMA(value)
      // console.log('11')
    }
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
    onSearch(val) {
      // console.log('搜索了')
      this.keyword = val
      const index = this.SearchHistorys.indexOf(val)
      if (index !== -1) {
        this.SearchHistorys.splice(index, 1)
      }
      this.SearchHistorys.unshift(val)
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
