<template>
  <div>
    <div class="pagination" v-if="!isEmpty">
      <p>共<span class="em">{{ pageCount }}</span>页</p>
      <p>当前页:<span class="em">{{ pageIndex }}</span></p>
      <p class="page-prev" @click="handlePageChange(pageIndex - 1)">
        <svg-icon iconClass="icon-left" />
        上一页
      </p>
      <p class="page-next" @click="handlePageChange(pageIndex + 1)">
        下一页
        <svg-icon iconClass="icon-right" />
      </p>
    </div>
    <div class="emptybox" v-else>
      <svg-icon iconClass="icon-empty" />
      <p>暂无数据,可惜</p>
    </div>
  </div>
</template>

<script>
import { defineProps, computed, toRefs } from 'vue';

export default {
  name: 'Pagination',
  setup(props, { emit }) {
    const { total, pageIndex, pageSize } = toRefs(props);

    // 计算总页数
    const pageCount = computed(() => {
      return Math.ceil(total.value / pageSize.value);
    });

    // 判断是否为空
    const isEmpty = computed(() => {
      return total.value === 0;
    });

    // 页码变更处理
    const handlePageChange = (val) => {
      if (val <= pageCount.value && val > 0) {
        emit('change', val);
      }
    };

    return {
      pageCount,
      isEmpty,
      handlePageChange,
      pageIndex
    };
  },
};
</script>


<style scoped lang="scss">
.pagination {
  display: flex;
  margin: 30px 0;
  p {
    margin-right: 15px;
  }
  .em {
    font-weight: bold;
    margin: 0 5px;
  }
}
.page {
  &-prev,
  &-next {
    cursor: pointer;
    transition: all ease 0.3s;
  }
  &-prev {
    &:hover {
      transform: translateX(-5px);
    }
  }
  &-next {
    &:hover {
      transform: translateX(5px);
    }
  }
}
.emptybox{
  color: #999;
  margin: 20px auto;
  font-size: 60px;
  text-align: center;
  p{
    margin-top: 5px;
    font-size: 13px;
  }
}
</style>
