<template>
  <transition name="to-top">
    <div class="to-top" @click="backToTop" v-show="isShow">
      <svg-icon iconClass="icon-top" />
    </div>
  </transition>
</template>

<script>
import { ref, onMounted, onUnmounted, defineComponent } from 'vue';

export default defineComponent({
  name: 'BackToTop',
  setup() {
    const isShow = ref(false);

    const throttle = (fn, delay) => {
      let preTime = Date.now();
      return function (...args) {
        const doTime = Date.now();
        if (doTime - preTime >= delay) {
          fn(...args);
          preTime = Date.now();
        }
      };
    };

    const scrollCallback = () => {
      const scrollTop =
          document.documentElement.scrollTop ||
          window.pageYOffset ||
          document.body.scrollTop;
      isShow.value = scrollTop > 500;
    };

    const scrollToAnchor = (anchorName) => {
      if (anchorName) {
        const anchorElement = document.getElementById(anchorName);
        if (anchorElement) {
          anchorElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const backToTop = () => {
      scrollToAnchor('app');
    };

    onMounted(() => {
      window.addEventListener('scroll', throttle(scrollCallback, 100));
    });

    onUnmounted(() => {
      window.removeEventListener('scroll', throttle(scrollCallback, 100));
    });

    return {
      isShow,
      backToTop
    };
  }
});
</script>



<style scoped lang="scss">
.to-top {
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 40px;
  height: 40px;
  background-color: rgba($color: #000000, $alpha: 0.7);
  color: #fff;
  text-align: center;
  line-height: 35px;
  transition: all ease 0.5s;
  cursor: pointer;
  z-index: 20;
  &:hover {
    transform: translateY(-10px);
  }
  &-enter-active,&-leave-active{
    transition:  all ease .5s;
  }
  &-enter,&-leave-to{
    opacity: 0;
    transform:translateY(20px)
  }
}
</style>
