<template>
  <div
      class="wrapper"
      :class="click ? 'wrapper--clickable' : ''"
      :style="{ borderRadius: type === 'round' ? '100%' : '10px' }"
  >
    <svg-icon :iconClass="`icon-${icon}`" />
    <div class="label">
      <a :href="`tel:${label}`" v-if="canCopy">
        {{ label }}
      </a>
      <span v-else>{{ label }}</span>
    </div>
  </div>
</template>

<script>
import { defineProps } from 'vue';

export default {
  name: 'NiCell',
  setup() {
    // 定义 props
    const props = defineProps({
      type: {
        type: String,
        default: ''
      },
      label: {
        type: String
      },
      canCopy: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: 'base'
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
  display: flex;
  width: 120px;
  padding: 10px;
  align-items: center;
  background: #e6eef4;
  animation: up ease 0.5s;
  transition: all ease 0.2s;
  box-shadow: 6px 6px 10px #ced2d6, -6px -6px 10px #ffffff;
  &--clickable {
    &:active {
      box-shadow: 6px 6px 10px #dbdddf, -6px -6px 10px #f8f8f8,
        inset 6px 6px 10px #ced2d6, inset -6px -6px 10px #ffffff !important;
    }
  }
  .label {
    margin-left: 10px;
    font-size: 14px;
  }
}
@keyframes up {
  0% {
    box-shadow: 0 0 0 #ced2d6, 0 0 0 #ffffff;
  }
  100% {
    box-shadow: 6px 6px 10px #ced2d6, -6px -6px 10px #ffffff;
  }
}
</style>
