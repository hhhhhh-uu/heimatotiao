<template>
  <div>
    <van-nav-bar
      :title="
        comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'
      "
    >
      <van-icon slot="left" name="cross" @click="$emit('close')" />
    </van-nav-bar>
    <div class="scroll-wrap">
      <commentItrm :comment="comment" />
      <van-cell title="全部回复" />
      <commentList :source="comment.com_id" type="c" :list="commentList" />
    </div>
    <div class="post-wrap">
      <van-button class="post-btn" size="small" round @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <van-popup v-model="isPostShow" position="bottom">
      <commentPost :target="comment.com_id" @post-success="onPostSuccess" />
    </van-popup>
  </div>
</template>

<script>
import commentItrm from '@/views/article/components/commentItrm.vue'
import commentList from '@/views/article/components/commentList.vue'
import commentPost from '@/views/article/components/commentPost.vue'
export default {
  data() {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    commentItrm,
    commentList,
    commentPost
  },
  methods: {
    onPostSuccess(data) {
      this.comment.reply_count++
      this.isPostShow = false
      this.commentList.unshift(data.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
