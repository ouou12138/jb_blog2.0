<template>
  <transition name="nav">
    <div class="nav" v-show="isShow">
      <ul>
        <li v-for="item in navList" :key="item.id">
          <router-link :to="{ name: item.to }">{{ item.name }}</router-link>
        </li>
      </ul>
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'Nav',
  setup() {
    const isShow = ref(false);
    const lastTop = ref(0);
    const navList = ref([
      { id: 1, to: 'Archive', name: '归档' },
      { id: 2, to: 'Book', name: '书单' },
      // { id: 3, to: 'Lineblog', name: '行博' },
      { id: 4, to: 'About', name: '关于' }
    ]);

    // 节流函数
    const throttle = (fn, delay) => {
      let preTime = Date.now();
      return function () {
        const context = this;
        const args = arguments;
        const doTime = Date.now();
        if (doTime - preTime >= delay) {
          fn.apply(context, args);
          preTime = Date.now();
        }
      };
    };

    // 滚动回调
    const scrollCallback = () => {
      const scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
      if (scrollTop < lastTop.value - 50) {
        // 向上滚动，导航栏出现
        isShow.value = true;
      }
      if (scrollTop > lastTop.value + 50) {
        // 向下滚动，导航栏消失
        isShow.value = false;
      }
      lastTop.value = scrollTop;
    };

    onMounted(() => {
      window.addEventListener('scroll', throttle(scrollCallback, 100));
    });

    onBeforeUnmount(() => {
      window.removeEventListener('scroll', throttle(scrollCallback, 100));
    });

    return {
      isShow,
      navList
    };
  }
};
</script>


<style scoped lang="scss">
.nav {
  position: fixed;
  left: 0;
  top: 0;
  height: 50px;
  width: 100%;
  z-index: 12;
  // background: linear-gradient(to bottom, #fff 10%, transparent 95%);
  background-color: #cfc0c033;
  font-weight: bold;
  backdrop-filter: blur(4px);
  box-shadow: 0 2px 5px 0px #ddd;
  &-enter-active,&-leave-active{
    transition: all ease .5s;
  }
  &-enter,&-leave-to{
    transform: translateY(-100%);
  }
  ul {
    width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    font-size: 17px;
    li {
      position: relative;
      line-height: 50px;
      border-bottom: 2px solid transparent;
      transition: all ease .5s;
      color: #333;
      overflow: hidden;
      &::before,&::after{
        content: '';
        position: absolute;
        width: 100%;
        height: 1px;
        left: 0;
        transition: all ease .3s;
        background-color: brown;
      }
      &::before{
        top: 8px;
        transform: translateX(-100%);
      }
      &::after{
        bottom: 7px;
        transform: translateX(100%);
      }
      &:hover{
        color: brown;
      }
      &:hover::before{
        transform: translateX(0);
      }
      &:hover::after{
        transform: translateX(0);
      }
    }
  }
}
</style>
