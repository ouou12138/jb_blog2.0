<template>
  <div class="card">
    <div class="card-bg">
      <svg-icon :iconClass="`icon-${options.icon}`" :style="{ fontSize: options.size }" />
    </div>
    <div class="card-header">
      <div class="card-title">
        {{ options.title }}
      </div>
      <div class="card-time">{{ options.time }}</div>
    </div>
    <ul class="list">
      <li class="item" v-for="(item, i) in options.labelList" :key="i">
        <div class="item-label">{{ item }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent, toRefs } from "vue";

export default defineComponent({
  name: "Card",
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    // 使用 toRefs 解构 props.options，确保其内部响应式
    const { options } = toRefs(props);

    return {
      options,
    };
  },
});
</script>

<style scoped lang="scss">
.card {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
  &-bg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    color: #dae3ea;
  }
  &-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    align-items: center;
  }
  &-title {
    font-size: 15px;
    font-weight: 600;
  }
  &-time {
    font-size: 12px;
  }
}
.item {
  display: flex;
  align-items: center;
  font-size: 13px;
  padding: 5px 0;
  &-brief {
    font-size: 14px;
  }
  &-label {
    position: relative;
    padding-left: 12px;
    text-align: justify;
    &::before {
      content: "";
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 100%;
      background-color: #3fa1ee;
      left: 0px;
      top: 6px;
    }
  }
}
</style>
