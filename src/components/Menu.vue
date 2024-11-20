<template>
  <div>
    <button class="menu-btn" @click="handleShow">
      <svg-icon iconClass="icon-menu" />
    </button>
    <order-dialog openType="subscribe" :isShow.sync="showOrderDialog" />
    <div v-show="show">
      <transition name="menu-mask">
        <div class="menu-mask" v-show="show && maskShow" @click="handleClose" />
      </transition>
      <div class="menu">
        <div class="menu-row" v-for="row in menuList" :key="row.id">
          <transition :name="`cell_${item.pos}`" v-for="item in row.detail" :key="item.id">
            <div
                :class="`menu-cell cell_${item.pos}`"
                v-show="show && itemShow"
                @click="handleCellClick(item.id)"
            >
              <div class="menu-cell-inside">
                <div class="menu-cell--normal rect">
                  <svg-icon :iconClass="`icon-${item.icon}`" />
                  <div>{{ item.title }}</div>
                </div>
                <router-link :to="{ name: item.to }">
                  <div class="menu-cell--flip rect">{{ item.title }}</div>
                </router-link>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onCreated } from 'vue';
import OrderDialog from '@/components/OrderDialog';

export default defineComponent({
  name: 'Menu',
  components: {
    OrderDialog,
  },
  setup() {
    const show = ref(false);
    const showOrderDialog = ref(false);
    const itemShow = ref(true);
    const maskShow = ref(false);

    const menuList = reactive([
      {
        id: 1,
        detail: [
          { id: 1, title: '博文', pos: 'lt', icon: 'archive', to: 'Archive' },
          { id: 2, title: '书单', pos: 'mt', icon: 'book', to: 'Book' },
          { id: 3, pos: 'rt', title: '关于', icon: 'about', to: 'About' },
        ],
      },
      {
        id: 2,
        detail: [
          { id: 4, title: '力扣', pos: 'lc', icon: 'leetcode' },
          { id: 5, pos: 'mc', title: '订阅', icon: 'order' },
          { id: 6, title: '音频', pos: 'rc', icon: 'sing' },
        ],
      },
      {
        id: 3,
        detail: [
          { id: 7, title: 'Github', pos: 'lb', icon: 'github' },
          { id: 8, title: '思否', pos: 'mb', icon: 'sf' },
          { id: 9, title: '分享', pos: 'rb', icon: 'share' },
        ],
      },
    ]);

    const handleShow = () => {
      show.value = true;
      itemShow.value = true;
      maskShow.value = true;
    };

    const handleClose = () => {
      itemShow.value = false;
      maskShow.value = false;
      setTimeout(() => {
        show.value = false;
      }, 800);
    };

    const handleCellClick = (id) => {
      if (id === 5) {
        // 订阅
        const regSub = /.*#\d+_sub;/;
        const regUser = /.*#(\d+)_user;/;
        if (localStorage.info && regSub.test(localStorage.info)) {
          // 已经订阅
          this.$toast.success('您已经订阅过啦');
        } else if (localStorage.info && regUser.test(localStorage.info)) {
          // 已经注册用户，但是未订阅
          const id = localStorage.info.match(regUser)[1];
          subscribe(id);
        } else {
          // 未注册用户
          showOrderDialog.value = true;
        }
      } else if (id === 4) {
        window.open('https://leetcode-cn.com/u/lee-lei/', '_blank');
      } else if (id === 3) {
        window.scrollTo(0, 0);
      } else if (id === 6) {
        window.open('https://kg.qq.com/node/personal?uid=619894872c2d318237', '_blank');
      } else if (id === 7) {
        window.open('https://github.com/leedalei', '_blank');
      } else if (id === 8) {
        window.open('https://segmentfault.com/u/lidalei', '_blank');
      } else if (id === 9) {
        handleShare();
      }
      show.value = false;
    };

    const subscribe = async (id) => {
      try {
        await this.$api.subscribe({ params: { id } });
        localStorage.info += `#${id}_sub;`;
        this.$toast.success('订阅成功，非常感谢!');
      } catch (error) {
        this.$toast.error(error);
      }
    };

    const handleShare = () => {
      const cpText = window.location.href;
      this.$copyText(cpText)
          .then(() => {
            this.$toast.success('已复制，去分享给朋友吧');
          })
          .catch(() => {
            this.$toast.error('复制失败');
          });
    };

    onCreated(() => {
      const regSub = /.*#\d+_sub;/;
      if (localStorage.info && regSub.test(localStorage.info)) {
        menuList[2].title = '已订阅';
      }
    });

    return {
      show,
      showOrderDialog,
      itemShow,
      maskShow,
      menuList,
      handleShow,
      handleClose,
      handleCellClick,
      subscribe,
      handleShare,
    };
  },
});
</script>


<style scoped lang="scss">
.menu {
  position: fixed;
  width: 400px;
  left: calc(50% - 200px);
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #d5d5d5;
  z-index: 999;
  &-mask {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 990;
    &-leave-active {
      animation: fadeOut 0.5s linear;
    }
    @keyframes fadeOut {
      100% {
        opacity: 0;
      }
    }
  }

  &-btn {
    position: fixed;
    left: 5px;
    top: 7px;
    background-color: transparent;
    color: #666;
    font-size: 34px;
    cursor: pointer;
    z-index: 30;
    animation: roll ease 3s infinite;
    line-height: 0;
  }
  @keyframes roll {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }
  &-row {
    display: flex;
    width: 100%;
    height: 120px;
    margin: 20px 0;
    justify-content: space-between;
    align-items: center;
  }
  &-cell {
    width: calc(33.3% - 10px);
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    cursor: pointer;
    overflow: hidden;
    border: 1px solid #222;

    &-inside {
      width: 100%;
      height: 100%;
      transition: all ease 0.5s;
      .svg-icon {
        font-size: 24px;
      }
      .rect {
        display: flex;
        flex-direction: column;
        > div {
          margin-top: 8px;
          font-size: 14px;
        }
        height: 100%;
        margin: 0;
        font-size: 20px;
        font-weight: 500;
        justify-content: center;
        align-items: center;
        transition: all ease 0.5s;
      }
      &:hover {
        transform: translateY(-100%);
        p {
          background-color: rgba(255, 255, 255, 0.3);
        }
      }
    }
  }
  .cell {
    //enter
    &_lt-enter-active {
      animation: flyInfromLT linear 0.3s;
    }
    &_mt-enter-active {
      animation: flyInfromMT linear 0.3s;
    }
    &_rt-enter-active {
      animation: flyInfromRT linear 0.3s;
    }
    &_lc-enter-active {
      animation: flyInfromLC linear 0.3s;
    }
    &_mc-enter-active {
      animation: flyInfromMC linear 0.3s;
    }
    &_rc-enter-active {
      animation: flyInfromRC linear 0.3s;
    }
    &_lb-enter-active {
      animation: flyInfromLB linear 0.3s;
    }
    &_mb-enter-active {
      animation: flyInfromMB linear 0.3s;
    }
    &_rb-enter-active {
      animation: flyInfromRB linear 0.3s;
    }
    //leave
    &_lt-leave-active {
      animation: flyInfromLT linear 0.3s alternate-reverse;
    }
    &_mt-leave-active {
      animation: flyInfromMT linear 0.3s alternate-reverse;
    }
    &_rt-leave-active {
      animation: flyInfromRT linear 0.3s alternate-reverse;
    }
    &_lc-leave-active {
      animation: flyInfromLC linear 0.3s alternate-reverse;
    }
    &_mc-leave-active {
      animation: flyInfromMC linear 0.3s alternate-reverse;
    }
    &_rc-leave-active {
      animation: flyInfromRC linear 0.3s alternate-reverse;
    }
    &_lb-leave-active {
      animation: flyInfromLB linear 0.3s alternate-reverse;
    }
    &_mb-leave-active {
      animation: flyInfromMB linear 0.3s alternate-reverse;
    }
    &_rb-leave-active {
      animation: flyInfromRB linear 0.3s alternate-reverse;
    }
  }
  // top
  @keyframes flyInfromLT {
    0% {
      transform: translate3D(-100%, -100%, 0);
      opacity: 0.2;
    }
    100% {
      transform: translate3D(0);
      opacity: 1;
    }
  }
  @keyframes flyInfromMT {
    0% {
      transform: translate3D(0, -100%, 0);
      opacity: 0.2;
    }
    100% {
      transform: translate3D(0);
      opacity: 1;
    }
  }
  @keyframes flyInfromRT {
    0% {
      transform: translate3D(100%, -100%, 0);
      opacity: 0.2;
    }
    100% {
      transform: translate3D(0);
      opacity: 1;
    }
  }
  // middle
  @keyframes flyInfromLC {
    0% {
      transform: translate3D(-100%, 0, 0);
      opacity: 0.2;
    }
    100% {
      transform: translate3D(0);
      opacity: 1;
    }
  }
  @keyframes flyInfromMC {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }
  @keyframes flyInfromRC {
    0% {
      transform: translate3D(100%, 0, 0);
      opacity: 0.2;
    }
    100% {
      transform: translate3D(0);
      opacity: 1;
    }
  }

  // bottom
  @keyframes flyInfromLB {
    0% {
      transform: translate3D(-100%, 100%, 0);
      opacity: 0.2;
    }
    100% {
      transform: translate3D(0);
      opacity: 1;
    }
  }
  @keyframes flyInfromMB {
    0% {
      transform: translate3D(0, 100%, 0);
      opacity: 0.2;
    }
    100% {
      transform: translate3D(0);
      opacity: 1;
    }
  }
  @keyframes flyInfromRB {
    0% {
      transform: translate3D(100%, 100%, 0);
      opacity: 0.2;
    }
    100% {
      transform: translate3D(0);
      opacity: 1;
    }
  }
}
</style>
