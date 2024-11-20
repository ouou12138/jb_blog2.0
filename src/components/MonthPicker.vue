<template>
  <div class="picker">
    <header class="picker-header">
      <span
          :class="`picker-icon ${canPrev.value ? '' : 'picker-icon--disable'}`"
          @click="handleChange('year', curYear.value - 1)"
          aria-label="Previous Year"
      >
        <svg-icon iconClass="icon-triangle-left" />
      </span>
      <span class="picker-year">{{ curYear.value }}</span>
      <span
          :class="`picker-icon ${canNext.value ? '' : 'picker-icon--disable'}`"
          @click="handleChange('year', curYear.value + 1)"
          aria-label="Next Year"
      >
        <svg-icon iconClass="icon-triangle-right" />
      </span>
    </header>
    <ul>
      <li
          v-for="item in monthList"
          :key="item.month"
          :class="curMonth.value == item.month ? 'current-month' : ''"
          @click="handleChange('month', item.month)"
          :aria-label="`Select ${item.month} month`"
      >
        <span>{{ item.month }}月</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed } from 'vue';

export default {
  name: 'MonthPicker',
  props: {
    minYear: {
      type: Number,
      default: 2019
    },
    maxYear: {
      type: Number,
      default: new Date().getFullYear()
    }
  },
  setup(props, { emit }) {
    const monthList = ref([
      { month: 1, total: 0 },
      { month: 2, total: 0 },
      { month: 3, total: 0 },
      { month: 4, total: 0 },
      { month: 5, total: 0 },
      { month: 6, total: 0 },
      { month: 7, total: 0 },
      { month: 8, total: 0 },
      { month: 9, total: 0 },
      { month: 10, total: 0 },
      { month: 11, total: 0 },
      { month: 12, total: 0 }
    ]);

    const curYear = ref(new Date().getFullYear());
    const curMonth = ref(0);

    const canPrev = computed(() => curYear.value > props.minYear);
    const canNext = computed(() => curYear.value < props.maxYear);

    const handleChange = (type, value) => {
      if (type === 'year') {
        if (value > props.maxYear || value < props.minYear) {
          return;
        }
        curYear.value = value;
        return;
      } else {
        if (curMonth.value === value) {
          curMonth.value = 0;
          emit('change', null);
          return;
        }
        curMonth.value = value;
      }

      const startTime = `${curYear.value}-${curMonth.value}-1`;
      const endTime = `${curMonth.value + 1 > 12 ? curYear.value + 1 : curYear.value
      }-${curMonth.value + 1 > 12 ? 1 : curMonth.value + 1}-1`;
      emit('change', { startTime, endTime });
    };

    return {
      monthList,
      curYear,
      curMonth,
      canPrev,
      canNext,
      handleChange
    };
  }
}
</script>


<style scoped lang="scss">
.picker {
  &-header {
    display: flex;
    justify-content: center;
    color: #666;
    font-size: 20px;
    margin-bottom: 20px;
  }
  &-icon {
    cursor: pointer;
    &--disable {
      color: #d9d9d9;
    }
  }
  &-year {
    margin-left: 15px;
    margin-right: 15px;
  }
  ul {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 60px 60px 60px;
    gap: 5px;
  }
  li {
    user-select: none;
    position: relative;
    text-align: center;
    line-height: 60px;
    border: 1px solid #d9d9d9;
    cursor: pointer;
    transition: all ease 0.5s;
    &:hover {
      border-radius: 15px 0 15px 0;
      border: 1px solid brown;
    }
    .badge {
      position: absolute;
      top: -1px;
      right: 0;
      line-height: 1em;
      display: inline;
      background-color: brown;
      color: #fff;
      font-size: 12px;
      padding: 3px 4px;
      transform-origin: top right;
      transform: scale(0.9, 0.8);
    }
  }

  .current-month {
    color: #fff;
    border: 1px solid brown;
    background-color: brown;
  }
}
</style>
