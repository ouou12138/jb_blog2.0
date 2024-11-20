<template>
  <div class="tag">
    <ul>
      <li
          v-for="item in tagList"
          :key="item.id"
          :title="item.name"
          :class="currentTag === item.id ? 'current-tag' : ''"
          @click="handleClick(item)"
      >{{ item.name }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'TagPicker',
  setup(props, { emit }) {
    const currentTag = ref('');
    const tagList = ref([]);

    // 获取标签数据
    const getTags = async () => {
      try {
        const data = await this.$api.getTags({
          params: {
            pageIndex: 1,
            pageSize: 999
          }
        });
        tagList.value = data.items;
      } catch (e) {
        console.error(e);
      }
    };

    // 处理标签点击
    const handleClick = (item) => {
      if (currentTag.value === item.id) {
        currentTag.value = '';
      } else {
        currentTag.value = item.id;
      }
      emit('change', currentTag.value);
    };

    // 在组件挂载时调用 getTags
    onMounted(() => {
      getTags();
    });

    return {
      currentTag,
      tagList,
      handleClick
    };
  }
};
</script>


<style scoped lang="scss">
.tag {
  ul {
    width: 100%;
  }
  li {
    font-size: 13px;
    user-select: none;
    display: inline-block;
    width: calc(33.33% - 14px);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 5px;
    padding: 7px 2px;
    text-align: center;
    border: 1px solid #b9b9b9;
    color: #666;
    transition: all ease 0.5s;
    cursor: pointer;
    &:hover {
      border-radius: 10px 0 10px 0;
      border: 1px solid brown;
    }
    &:nth-child(3n + 1) {
      margin-left: 0;
    }
    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }
  .current-tag {
    border: 1px solid brown;
    background-color: brown;
    color: #fff;
  }
}
</style>
