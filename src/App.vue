<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="router">
        <component :is="Component"></component>
      </transition>
    </router-view>
    <l-menu v-if="!isMobileView" />
    <Nav v-if="!isMobileView" />
    <back-to-top v-if="!isMobileView" />
    <music-player v-if="!isMobileView" />
    <div class="app-bg"></div>
  </div>
</template>

<script>
import LMenu from '@/components/Menu.vue'
import BackToTop from '@/components/BackToTop.vue'
import Nav from '@/components/Nav.vue'
import MusicPlayer from '@/components/MusicPlayer.vue'
import router from './router'

export default {
  components: { LMenu, Nav, BackToTop, MusicPlayer },
  data() {
    return {
      isMobileView: true // 默认不显示
    }
  },
  created() {
    if (this.isMobile()) {
      router.push('/resume')
    }
  },
  mounted() {
    this.isMobileView = this.isMobile()
  },
  methods: {
    isMobile() {
      const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag
    }
  }
}
</script>
<style lang="scss">
@use "@/assets/css/index.scss";

html,
body {
  font-size: 14px;
  width: 100%;
  overflow-x: hidden;
  min-height: 100vh;
  margin: 0;
  font-family: Lato, "Microsoft Jhenghei", "Hiragino Sans GB", "Microsoft YaHei",
    sans-serif;
  background-color: #fff;
}

#app {
  position: relative;
  width: 100%;
  height: 100%;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  background: url("./assets/img/bg2.jpg") no-repeat;
  background-position: center center;
  background-size: contain;
  animation: blurOut 3s linear forwards;
}

.router {
  position: relative;
  z-index: 2;
}

@keyframes blurOut {
  0% {
    filter: blur(0);
  }

  40% {
    filter: blur(1px);
  }

  100% {
    filter: blur(8px);
  }
}

.router {
  &-enter-active {
    animation: routerIn ease .5s;
  }

  &-leave-active {
    position: absolute;
    opacity: 0;
  }

  &-move {
    transition: all ease .5s;
  }
}

@keyframes routerIn {
  0% {
    opacity: 0;
    transform: scale(0.1);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
