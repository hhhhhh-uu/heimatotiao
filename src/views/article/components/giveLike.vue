<template>
  <van-icon
    :color="value === 1 ? 'red' : ''"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    :loading="loading"
    @click="oncollect"
  />
</template>

<script>
import { deleteLike, addLike } from '@/api'
export default {
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async oncollect() {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
          await addLike(this.articleId)
        } else {
          await deleteLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast.fail('操作失败请重试~')
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
