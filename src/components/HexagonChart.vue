<template>
  <div>
    <div className="card-title">
      <svg-icon v-if="icon" :iconClass="`icon-${icon}`"/>
      {{ title }}
    </div>
    <canvas id="container" height="170"></canvas>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import drawRadar from "@/assets/js/drawRadar.js";

export default {
  name: "RadarChart",
  props: {
    title: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const chart = ref(null);
    const containerId = "container";
    const data = ref([
      {label: "数据结构", score: 85},
      {label: "算法", score: 85},
      {label: "后端", score: 70},
      {label: "http", score: 80},
      {label: "英语", score: 88},
      {label: "UI设计", score: 65},
    ]);

    const setWidth = () => {
      const canvas = document.getElementById(containerId);
      const parent = canvas.parentNode;
      if (parent) {
        const width = parent.clientWidth;
        canvas.setAttribute("width", `${width}px`);
      }
    };

    const initChart = () => {
      drawRadar({
        id: containerId,
        data: data.value,
      });
    };

    onMounted(() => {
      setWidth();
      initChart();
    });

    return {
      chart,
      data,
      setWidth,
      initChart,
    };
  },
};
</script>

<style scoped lang="scss">
.card {
  &-title {
    padding: 10px 10px 0;
    font-size: 15px;
    font-weight: 500;
  }
}
</style>
