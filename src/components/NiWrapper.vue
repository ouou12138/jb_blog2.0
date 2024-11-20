<template>
  <div
      class="wrapper"
      :class="click ? 'wrapper--clickable' : ''"
      :style="{ borderRadius: type === 'round' ? '100%' : '10px' }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { defineProps } from 'vue';

export default {
  name: 'NiWrapper',
  setup() {
    // 定义 props
    const props = defineProps({
      type: {
        type: String,
        default: ''
      },
      click: {
        type: Boolean,
        default: true
      }
    });

    // 在此可以定义计算属性和方法 (如果有必要)

    return {
      ...props // 将所有 props 返回，以供模板中使用
    };
  }
};
</script>


<style scoped lang="scss">
.wrapper {
  background: #e6eef4;
  animation: up ease 0.5s;
  transition: all ease 0.1s;
  box-shadow: 8px 8px 15px #ced2d6, -8px -8px 15px #ffffff;
  &--clickable {
    &:active {
      box-shadow: 6px 6px 10px #dbdddf, -6px -6px 10px #f8f8f8,
        inset 8px 8px 15px #ced2d6, inset -8px -8px 15px #ffffff !important;
    }
  }
}
@keyframes up {
  0% {
    box-shadow: 0 0 0 #ced2d6, 0 0 0 #ffffff;
  }
  100% {
    box-shadow: 8px 8px 15px #ced2d6, -8px -8px 15px #ffffff;
  }
}
</style>
