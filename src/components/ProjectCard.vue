<template>
  <div class="card">
    <div class="card-title">
      <svg-icon
          v-if="options.icon"
          :iconClass="`icon-${options.icon}`"
      />
      {{ options.title }}
    </div>
    <div class="card-brief">
      {{ options.brief }}
    </div>
    <ul class="list">
      <li class="item" v-for="(item, i) in options.labelList" :key="i">
        <div class="item-label">{{ item }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { defineProps } from 'vue';

export default {
  name: 'Card',
  setup() {
    // Define props
    const props = defineProps({
      options: {
        type: Object,
        default: () => ({})
      }
    });

    return {
      options: props.options
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
  &-brief{
    font-size: 14px;
  }
  &-label{
    position: relative;
    padding-left: 12px;
    text-align: justify;
    &::before{
      content: '';
      position: absolute;
      width: 6px;
      height: 6px;
      border-radius: 100%;
      background-color: #3fa1ee;
      left: 0;
      top: 6px;
    }
  }
}
</style>
