<template>
  <div>
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" class="form" ref="form">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            round
            size="small"
            class="code-btn"
            native-type="button"
            v-if="isShowCode"
            @click="sendCode"
            >发送验证码</van-button
          >
          <van-count-down
            :time="60 * 1000"
            format="ss秒"
            @finish="isShowCode = true"
            v-else
          />
        </template>
      </van-field>
      <div style="margin: 0.42rem">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { codeRules, mobileRules } from '../rules'
import { login, getCodeAPI } from '@/api/user'
export default {
  name: 'login',
  data() {
    return {
      mobile: '',
      code: '',
      codeRules,
      mobileRules,
      isShowCode: true
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      try {
        this.loading()
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)
        this.$store.commit('SET_TOKEN', token)
        this.$router.push('/profile')
        this.$toast.success('登录成功')
      } catch (error) {
        const status = error.response.status
        let message = '请重新登录'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      this.$refs.form.validate('mobile').then(async () => {
        this.loading()
        try {
          await getCodeAPI(this.mobile)
          this.$toast.success('获取验证码成功')
          this.isShowCode = false
        } catch (error) {
          const status = error.response.status
          let message = '手机号码不正确'
          if (status === 429) {
            message = error.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}

:deep(.form) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
:deep(.code-btn) {
  &.van-button--mini {
    padding: 0 0.2 rem;
  }
  &.van-button--default {
    background: #eeeeee;
    color: #a9929b;
  }
}
</style>
