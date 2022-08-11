<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isDeleteShow">
        <span @click="$emit('clear-search-history')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </template>
      <van-icon v-else name="delete" @click="isDeleteShow = true" />
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in SearchHistorys"
      :key="index"
      @click="onHistoryClick(item, index)"
    >
      <van-icon v-show="isDeleteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data() {
    return {
      isDeleteShow: false
    }
  },
  props: {
    SearchHistorys: {
      type: Array,
      required: true
    }
  },
  methods: {
    onHistoryClick(item, index) {
      if (this.isDeleteShow) {
        this.SearchHistorys.splice(index, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style></style>
