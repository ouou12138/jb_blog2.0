<template>
  <div :class="`home ${isFirstView ? 'first-view' : ''}`">
    <div class="main">
      <p class="subtitle">Hi there, I am</p>
      <h1 class="title">Lee Lei, a Chinese</h1>
      <h1><span class="black">front-end Engineer.</span></h1>
    </div>
    <div class="footer">
      <a href="http://beian.miit.gov.cn" target="_blank">粤ICP备20008695号</a>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'Home',
  setup() {
    const store = useStore();
    const isFirstView = computed(() => store.state.isFirstView);

    onMounted(() => {
      setTimeout(() => {
        store.commit('SET_AlEADYVIEW', false);
      }, 3000);
    });

    return {
      isFirstView,
    };
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  user-select: none;
  text-align: center;
}
.footer{
  position: fixed;
  bottom: 20px;
  left: 50%;
  font-size: 12px;
  color: #999;
  transform: translateX(-50%);
  z-index: 3;
}
.first-view{
  animation: clear 3s linear;
}
@keyframes upAndDown {
  0%{
    transform: translateY(0);
  }
  100%{
    transform: translateY(-8px);
  }
}
@keyframes clear {
  0%{
    filter: blur(12px);
  }
  30%{
    filter: blur(10px);
  }
  100%{
    filter: blur(0);
  }
}
.subtitle {
  font-size: 36px;
  color: #a9a9a9;
  font-family: "Candara", sans-serif;
}
h1 {
  font-size: 100px;
  font-weight: normal;
  color: #a9a9a9;
  font-family: "Candara", sans-serif;

}
.title{
  margin-top: 25px;
}
.black {
  color: #333;
}
</style>