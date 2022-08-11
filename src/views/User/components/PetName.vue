<template>
  <div>
    <van-nav-bar
      class="title-nic"
      title="更新昵称"
      left-text="取消"
      right-text="保存"
      @click-right="updateUserName"
      @click-left="$emit('close')"
    />
    <van-field
      v-model.trim="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="11"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { PetNameInfo } from '@/api'
export default {
  name: 'PetName',
  data() {
    return {
      localName: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  created() {
    this.message = this.name
  },
  methods: {
    async updateUserName() {
      //  try {
      //   if (this.message.trim() === '') return this.$toast('请输入昵称')
      //   await updateUserName({
      //     name: this.message
      //   })
      //   this.$emit('input', this.message)
      //   this.$emit('close')
      //   this.$toast('更新成功')
      // } catch (err) {
      //   this.$toast('更新失败')
      // }
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await PetNameInfo({
          name: localName
        })
        // console.log(data)
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
:deep(.van-nav-bar__content) {
  .van-nav-bar__title.van-ellipsis {
    color: #000;
  }
}
</style>
