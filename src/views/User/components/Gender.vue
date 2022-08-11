<template>
  <div>
    <van-picker
      show-toolbar
      title="更新性别"
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="updateGender"
      @change="onGender"
    />
  </div>
</template>

<script>
import { PetNameInfo } from '@/api'
export default {
  name: 'Gender',
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    async updateGender() {
      try {
        const localGender = this.localGender
        await PetNameInfo({
          gender: localGender
        })
        // console.log(data)
        this.$emit('input', localGender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    },
    onGender(picker, value, index) {
      this.localGender = index
    }
  }
}
</script>

<style></style>
