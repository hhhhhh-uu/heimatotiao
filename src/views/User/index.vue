<template>
  <div>
    <van-nav-bar
      class="navbar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image round width="0.8rem" height="0.8rem" :src="userInfo.photo" />
      <input
        type="file"
        hidden
        accept=".jpg"
        ref="file"
        @change="selectPhoto"
      />
    </van-cell>
    <van-popup
      class="avator-popup"
      v-model="isShowAvator"
      closeable
      :style="{ height: '100%', width: '100%' }"
      ><Update-avator
        :photo="photo"
        @update-avator="userInfo.photo = $event"
        v-if="isShowAvator"
      ></Update-avator
    ></van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
import UpdateAvator from './components/UpdateAvator.vue'
import { resolveToBase64 } from '@/utils'
export default {
  name: 'User',
  data() {
    return {
      userInfo: {},
      isShowAvator: false,
      photo: ''
    }
  },
  components: {
    UpdateAvator
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        //   console.log(data)
      } catch (error) {
        this.$toast.fail('获取用户信息失败,请刷新~')
      }
    },
    async selectPhoto(e) {
      const file = e.target.files[0]
      //const url = window.URL.createObjectURL(file)
      // const fr = new FileReader()
      // fr.readAsDataURL(file)
      // fr.onload = (e) => {
      //   this.photo = e.target.result
      // }
      // // this.photo = url
      const url = await resolveToBase64(file)
      this.photo = url
      e.target.value = ''
      this.isShowAvator = true
    }
  }
}
</script>

<style soped lang="less">
.navbar {
  background-color: #3296fa;
}
.van-nav-bar__title {
  color: #fff;
}
.van-icon {
  color: #fff !important;
}
.van-icon-arrow {
  color: rgba(108, 103, 103, 0.66) !important;
}
.avator-popup {
  background-color: #000;
}
</style>
