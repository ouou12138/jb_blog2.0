<template>
  <div class="card">
    <div class="card-title">
      <svg-icon
          v-if="options.icon"
          :iconClass="`icon-${options.icon}`"
      />
      {{ options.title }}
    </div>
    <ul class="list">
      <li class="item" v-for="(item, i) in options.list" :key="i">
        <div class="item-label" :style="{ width: options.labelWidth + 'px' }">{{ item.label }}</div>
        <div class="item-progress">
          <div class="item-progress-inner" :class="'item-progress-inner-' + i" :style="{ width: item.progress + '%' }"></div>
        </div>
        <div class="item-tip">
          {{ progressToTip(item.progress) }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineProps } from 'vue';

export default {
  name: 'CardComponent',
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  setup() {
    // 方法替代 Vue 2 中的过滤器
    const progressToTip = (val) => {
      if (val < 50) {
        return '略懂';
      } else if (val < 65) {
        return '了解';
      } else if (val < 85) {
        return '熟练';
      } else if (val < 90) {
        return '精通';
      } else {
        return '精通';
      }
    };

    return {
      progressToTip
    };
  }
};
</script>


<style scoped lang="scss">
.card{
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 10px;
  display: inline-block;
  &-title{
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 10px;
  }
}
.item{
  display: flex;
  align-items: center;
  font-size: 13px;
  padding: 5px 0;
  &-label{
    white-space: nowrap;
  }
  &-progress{
    flex: 1;
    min-width: 60px;
    height: 6px;
    border-radius: 6px;
    line-height: 1;
    background-color: #d9e0e6;
    margin-right: 5px;
    &-inner{
      background-color: #3fa1ee;
      height: 6px;
      border-radius: 6px;
    }
    @for $i from 0 through 10 {
      .item-progress-inner-#{$i} {
        animation-delay: .75s * $i;
      }
    }
  }
  &-tip{
    white-space: nowrap;
  }
}
</style>
