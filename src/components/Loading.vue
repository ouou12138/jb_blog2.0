<template>
  <transition name="loading-wrap">
    <div v-show="isShow" class="loading-wrap">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          x="50%"
          y="50%"
          width="430"
          height="126"
          preserveAspectRatio="xMidYMid"
      >
        <g style="transform-origin:220.5px 66px;transform:scale(1)">
          <g transform="translate(220.5,66)">
            <g transform="translate(0,0)">
              <g
                  class="path"
                  style="transform: rotate(0deg); transform-origin: -108.245px -7.5272px; animation: 1s linear -0.586667s infinite normal forwards running loadingSpin;"
              >
                <path
                    d="M47.85-8.01L47.85 0L5.74 0L5.74-43.98L13.75-43.98L13.75-8.01L47.85-8.01"
                    fill="#353535"
                    stroke="none"
                    stroke-width="none"
                    transform="translate(-135.04003310203552,14.462801367441816)"
                    style="fill: rgb(53, 53, 53);"
                ></path>
              </g>
              <!-- 省略其余 SVG 内容，保留原样 -->
            </g>
          </g>
        </g>
      </svg>
    </div>
  </transition>
</template>

<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'Loading',
  setup() {
    // 使用 ref 定义响应式变量
    const isShow = ref(false);

    // 如果需要方法或生命周期逻辑，可以在这里添加
    return {
      isShow,
    };
  },
});
</script>


<style lang="scss">
.loading-wrap {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 8;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateZ(0);
  &-enter-active {
    animation: loadingWrapfade ease 0.3s;
  }
  &-leave-active {
    animation: loadingWrapfade ease 0.3s alternate-reverse;
  }
  @keyframes loadingWrapfade {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  text {
    text-anchor: middle;
    font-size: 80px;
    opacity: 0;
  }
}

@keyframes loadingSpin {
  0% {
    animation-timing-function: cubic-bezier(0.5856, 0.0703, 0.4143, 0.9297);
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
