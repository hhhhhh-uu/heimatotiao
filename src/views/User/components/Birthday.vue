<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onBirthday"
    />
  </div>
</template>

<script>
import { PetNameInfo } from '@/api'
import deis from 'dayjs'
export default {
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 8, 6),
      currentDate: new Date(this.value)
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onBirthday() {
      try {
        const currentDate = deis(this.currentDate).format('YYYY-MM-DD')
        await PetNameInfo({
          birthday: currentDate
        })
        // console.log(data)
        this.$emit('input', currentDate)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style></style>
