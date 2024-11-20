<template>
  <div class="wrapper">
    <div class="fix">
      <transition name="zoom">
        <div class="part part1" v-show="part1Show">
          <h1>你好呀，</h1>
          <h1>
            我叫李雷,
            <p class="font24">本名李伟城</p>
          </h1>
          <h1>兄弟，你呢？</h1>
        </div>
      </transition>
      <transition name="zoom">
        <div class="part part2" v-show="part2Show">
          <div class="part2-text">
            <p class="font36">1997出生于</p>
            <p class="font48">广东河源</p>
            <p class="font48">是个客家人</p>
          </div>
          <transition name="fade">
            <div class="part2-img" v-show="part2Show2">
              <img
                  src="https://w.wallhaven.cc/full/zm/wallhaven-zmegpo.jpg"
                  alt=""
              />
            </div>
          </transition>
          <transition name="zoom">
            <div class="part2-img--circle" v-show="part2Show4">
              <img
                  src="https://inews.gtimg.com/newsapp_match/0/11239549506/0"
                  alt=""
              />
            </div>
          </transition>
          <transition name="zoom">
            <div class="part2-img--circle" v-show="part2Show5">
              <img src="https://www.hkcd.com/userfiles/1590460771.jpg" alt="" />
            </div>
          </transition>
          <transition name="zoom">
            <div class="part2-img--circle" v-show="part2Show6">
              <img
                  src="http://www.imperial-palace-hotspring.top/images/bg-ylm.jpg"
                  alt=""
              />
            </div>
          </transition>
        </div>
      </transition>
      <div class="part part3" v-show="part3Show">
        <transition name="fly-left">
          <div class="part3-text" v-show="part3Show2">
            <h1 class="font36">爱好：听歌，唱歌</h1>
            <h1 class="font48">张国荣</h1>
            <h1 class="font48">古巨基</h1>
            <h1 class="font48">陈奕迅</h1>
            <h1 class="font48">张学友</h1>
          </div>
        </transition>
        <transition name="fly-bottom">
          <div class="part3-card" ref="part3Card" v-show="part3Show3"></div>
        </transition>
      </div>
      <div class="part part4" v-show="part4Show">
        <transition name="zoom">
          <div class="part4-text" v-show="part4Show1">
            <h2 class="font36">2018年毕业于</h2>
            <h2 class="font48">广东工业大学</h2>
          </div>
        </transition>
        <transition name="fly-bottom">
          <div class="part4-pic" ref="part4Pic" v-show="part4Show2">
            <img src="@/assets/img/gdut.png" alt="" />
          </div>
        </transition>
      </div>
      <transition name="zoom">
        <div class="part part5" v-show="part5Show">
          <h2 class="font36">...</h2>
          <h2 class="font36">暂时没什么想说的</h2>
          <h2 class="font48">以后再加吧</h2>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';

export default {
  setup() {
    const state = reactive({
      part1Show: true,
      part2Show: false,
      part2Show2: false,
      part2Show3: false,
      part2Show4: false,
      part2Show5: false,
      part2Show6: false,
      part3Show: false,
      part3Show2: false,
      part3Show3: false,
      part4Show: false,
      part4Show1: false,
      part4Show2: false,
      part5Show: false,
      circleWidth: '',
    });

    const part3Card = ref(null);
    const part4Pic = ref(null);

    const handleScroll = () => {
      const scrolled =
          document.documentElement.scrollTop /
          (document.documentElement.scrollHeight -
              document.documentElement.clientHeight);
      state.circleWidth = 1500 * scrolled + 'px';

      state.part1Show = scrolled <= 0.1;

      if (scrolled > 0.15 && scrolled < 0.35) {
        state.part2Show = true;
        state.part2Show2 = scrolled > 0.2;
        state.part2Show3 = scrolled > 0.24;
        state.part2Show4 = scrolled > 0.28;
        state.part2Show5 = scrolled > 0.3;
        state.part2Show6 = scrolled > 0.32;
      } else {
        state.part2Show = false;
      }

      if (scrolled > 0.4 && scrolled < 0.55) {
        state.part3Show = true;
        state.part3Show2 = true;
        state.part3Show3 = true;
        if (part3Card.value) {
          part3Card.value.style.backgroundPositionY =
              ((scrolled - 0.4) / (0.53 - 0.4)) * 100 + '%';
        }
      } else {
        state.part3Show = false;
      }

      if (scrolled > 0.6 && scrolled < 0.85) {
        state.part4Show = true;
        state.part4Show1 = true;
        if (scrolled > 0.7 && part4Pic.value) {
          const ratio = (scrolled - 0.7) / (0.85 - 0.7);
          part4Pic.value.style.width = ratio * ratio * ratio * 5000 + 'px';
          part4Pic.value.style.opacity = 1 - ratio;
        }
      } else {
        state.part4Show = false;
      }

      state.part5Show = scrolled > 0.9;
    };

    onMounted(() => {
      window.addEventListener('scroll', handleScroll);
    });

    return { ...state, part3Card, part4Pic };
  },
};
</script>

<style scoped lang="scss">
.font24 {
  font-size: 24px;
}
.font36 {
  font-size: 36px;
}
.font48 {
  font-size: 48px;
}
.wrapper {
  background-color: #fff;
  width: 100%;
  height: 10000px;
  overflow: visible;
}
.fix {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.zoom {
  &-enter-active {
    animation: zoomIn ease 1s;
  }
  &-leave-active {
    animation: zoomIn ease 1s alternate-reverse;
  }
}
.fade {
  &-enter-active {
    animation: fadeIn ease 1s;
  }
  &-leave-active {
    animation: fadeIn ease 1s alternate-reverse;
  }
}
.fly-left {
  &-enter-active {
    animation: flyLeft ease 1s;
  }
  &-leave-active {
    animation: fadeOut ease 1s;
  }
}
.fly-bottom {
  &-enter-active {
    animation: flyBottom ease 1s;
  }
  &-leave-active {
    animation: fadeOut ease 1s;
  }
}
.part1 {
  position: absolute;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 34px;
  margin-top: -50px;
  z-index: 14;
  h1 {
    margin: 20px 0;
  }
}
.part2 {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &-text {
    margin-top: -100px;
    font-weight: bold;
    text-align: center;
  }
  &-img {
    position: absolute;
    top: 0;
    width: 100%;
    height: auto;
    z-index: -1;
    &--circle {
      position: absolute;
      z-index: 1;
      border-radius: 100%;
      border: 10px solid #fff;
      overflow: hidden;
      img {
        // max-width: 100%;
        max-height: 100%;
      }
      &:nth-child(3n + 1) {
        width: 300px;
        height: 300px;
        top: 50px;
        right: 200px;
      }
      &:nth-child(3n + 2) {
        width: 300px;
        height: 300px;
        right: 20px;
        bottom: 40px;
      }
      &:nth-child(3n + 3) {
        width: 400px;
        height: 400px;
        left: 40px;
        bottom: 200px;
      }
    }
  }
}
.part3 {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 13;
  &-card {
    height: 100%;
    width: 400px;
    background: url("../assets/img/singer.png") no-repeat;
    background-size: 100% auto;
  }
}

.part4 {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 12;
  &-text {
    text-align: center;
  }
  &-pic {
    min-width: 200px;
    img {
      width: 100%;
      height: auto;
    }
  }
}

.part5 {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
@keyframes flowUpEnter {
  0% {
    opacity: 0;
    transform: translateY(100vh);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes flowUpLeave {
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-100vh);
  }
}
@keyframes zoomIn {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes flyLeft {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
@keyframes flyBottom {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
