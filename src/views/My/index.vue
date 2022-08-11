<template>
  <div>
    <header>
      <div class="logins" v-if="isLogin">
        <!-- <div class="tuichu">
          <div>
            <button @click="$router.push('/user')" class="bianji">
              编辑按钮
            </button>
          </div> -->
        <div class="userInfo header">
          <!-- 基本信息 -->
          <div class="base">
            <div class="left">
              <van-image
                fit="cover"
                :src="userInfo.photo"
                class="avatar"
                round
              />
              <span class="name">{{ userInfo.name }}</span>
            </div>
            <div class="right">
              <van-button
                type="default"
                size="mini"
                round
                @click="$router.push('/user')"
                >编辑资料</van-button
              >
            </div>
          </div>
          <div class="data">
            <div class="data-item">
              <span>90</span>
              <span>头条</span>
            </div>
            <div class="data-item">
              <span>90</span>
              <span>关注</span>
            </div>
            <div class="data-item">
              <span>90</span>
              <span>粉丝</span>
            </div>
            <div class="data-item">
              <span>90</span>
              <span>获赞</span>
            </div>
          </div>
        </div>
      </div>
      <div class="logout" v-else @click="$router.push('/login')">
        <div class="dinwei">
          <img class="imgId" src="../../assets/images/banner.png" alt="" />
          <div class="denlu">
            <img
              class="imgmobile"
              src="../../assets/images/mobile.png"
              alt=""
            />
            <span class="zhuche">登录 / 注册</span>
          </div>
        </div>
      </div>
    </header>

    <main>
      <div>
        <div class="my-nav">
          <van-grid :column-num="2">
            <van-grid-item>
              <van-icon name="star-o" />
              <span class="ziti">收藏</span>
            </van-grid-item>
            <van-grid-item>
              <van-icon name="clock-o" />
              <span>历史</span>
            </van-grid-item>
          </van-grid>
        </div>
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>

    <footer>
      <van-button
        class="btn"
        size="large"
        text="退出"
        v-if="isLogin"
        @click="logout"
      ></van-button>
    </footer>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
export default {
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  data() {
    return {
      userInfo: ''
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '确认退出吗？'
        })
        .then(() => {
          // on confirm
          // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
          // on cancel
          console.log('取消执行这里')
        })
    },
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(data)
      } catch (error) {
        this.$toast.fail('获取用户信息失败,请刷新~')
      }
    }
  }
}
</script>

<style soped lang="less">
.my-nav {
  .van-grid {
    height: 2rem;
    .iconfont {
      font-size: 0.5rem;
    }
    span {
      font-size: 0.325rem;
      margin-top: 0.25rem;
      // color: #fff;
    }
  }
}
.my-nav-q {
  .van-grid {
    height: 2rem;
    .iconfont {
      font-size: 0.5rem;
    }
    span {
      font-size: 0.325rem;
      margin-top: 0.25rem;
      // color: #fff;
    }
  }
}
.btn {
  .van-button__content {
    .van-button__text {
      color: red;
    }
  }
}
.tuichu {
  height: 385px;
  background: url('../../assets/images/banner.png');
  background-size: 100%;
}
.dinwei {
  position: relative;
}
.imgId {
  width: 100%;
}
.denlu {
  position: absolute;
  bottom: 110px;
  right: 230px;
  // background-color: red;
  display: flex;
  flex-direction: column;
  align-items: center;
  .imgmobile {
    width: 50%;
  }
  .zhuche {
    color: #fff;
    font-size: 0.4rem;
    margin-top: 0.26667rem;
  }
}

.data {
  display: flex;
  justify-content: space-around;
  .data-item {
    height: 130px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    span:nth-child(1) {
      font-size: 36px;
      margin-bottom: 15px;
    }
    span:nth-child(2) {
      font-size: 23px;
    }
  }
}
.header {
  width: 750px;
  height: 401px;
  background: url('../../assets/images/banner.png');
  background-size: cover;
}
.userInfo {
  .base {
    height: 231px;
    padding: 76px 32px 23px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    .left {
      display: flex;
      align-items: center;
      .avatar {
        width: 132px;
        height: 132px;
      }
      .name {
        font-size: 29px;
        margin-left: 22px;
        color: #fff;
      }
    }
  }
}
.van-button__text {
  color: #666;
}
</style>
