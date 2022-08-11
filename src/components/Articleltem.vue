<template>
  <!-- 没有图片的结构 -->
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    :label="label"
    :to="`/article/${articleInfo.art_id}`"
  />

  <!-- 一张图片的结构 -->
  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    value="内容"
    :label="label"
    :to="`/article/${articleInfo.art_id}`"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
  </van-cell>

  <!-- 三张图片的结构 -->
  <van-cell
    v-else
    :title="articleInfo.title"
    value="内容"
    :label="label"
    :to="`/article/${articleInfo.art_id}`"
  >
    <van-image
      v-for="(item, index) in articleInfo.cover.images"
      :key="index"
      width="45"
      height="45"
      :src="item"
    />
  </van-cell>
</template>

<script>
import dayjs from 'dayjs'
export default {
  props: {
    articleInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const aut = this.articleInfo
      const daty = dayjs().to(dayjs(aut.pubdate))
      return `${aut.aut_name} ${aut.comm_count}评论 ${daty}`
    }
  }
}
</script>

<style></style>
