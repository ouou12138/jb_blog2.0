<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script>
import { defineProps, computed } from 'vue';

export default {
  name: 'SvgIcon',
  setup(props) {
    // 计算属性
    const iconName = computed(() => `#icon-${props.iconClass}`);
    const svgClass = computed(() => {
      return props.className ? 'svg-icon ' + props.className : 'svg-icon';
    });

    return {
      iconName,
      svgClass
    };
  }
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
