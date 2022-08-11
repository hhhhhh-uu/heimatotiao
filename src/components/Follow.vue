<template>
  <van-button
    v-if="isFollowed"
    class="follow-btn"
    round
    size="small"
    :loading="loading"
    @click="onFollow"
    >已关注</van-button
  >
  <van-button
    v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="loading"
    @click="onFollow"
    >关注</van-button
  >
</template>

<script>
import { addFollow, deleteFollow } from '@/api'
export default {
  data() {
    return {
      loading: false
    }
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onFollow() {
      this.loading = true
      try {
        if (this.isFollowed) {
          await deleteFollow(this.userId)
          // console.log(data)
          //   this.isFollowed = false
        } else {
          await addFollow(this.userId)
          // console.log(data)
          //   this.isFollowed = true
        }
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (error) {
        if (error.response && error.response.status == 400) {
          this.$toast('不能关注自己哦~')
        }
        this.$toast('操作失败,请重试~')
      }
      this.loading = false
    }
  }
}
</script>

<style></style>
