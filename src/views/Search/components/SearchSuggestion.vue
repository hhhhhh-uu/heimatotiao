<template>
  <div>
    <van-cell
      v-for="(item, index) in highlightSuggestions"
      :key="index"
      icon="search"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggetionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keyword: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      suggestions: []
    }
  },
  watch: {
    keyword: {
      immediate: true,
      handler() {
        this.getSearchSuggetion()
      }
    }
  },
  computed: {
    highlightSuggestions() {
      const reg = new RegExp(this.keyword, 'ig')

      return this.suggestions.map((item) =>
        item.replace(
          reg,
          (match) => `<span style="color: red;">${match}</span>`
        )
      )
    }
  },
  methods: {
    getSearchSuggetion: debounce(async function () {
      try {
        const { data } = await getSearchSuggetionsAPI(this.keyword)
        console.log(data)
        this.suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        this.$toast.fail('获取搜索建议失败~')
      }
    }, 300)
  }
}
</script>

<style></style>
