<template>
  <div class="box">
    <div class="tabs">
      <NiWrapper
          class="ni-wrapper"
          :class="curTab === i ? 'ni-wrapper--active' : ''"
          v-for="(item, i) in tabsList"
          :key="i"
          @click="curTab = i"
      >
        <svg-icon v-if="item.icon" :iconClass="`icon-${item.icon}`" />
      </NiWrapper>
    </div>
    <NiWrapper>
      <div class="tabs-desc">
        <p>
          {{ tabsList[curTab].desc }}
        </p>
        <p class="tabs-desc-link">
          <svg-icon iconClass="icon-right" />
          <a :href="tabsList[curTab].link">去看个人主页</a>
        </p>
      </div>
    </NiWrapper>
  </div>
</template>

<script>
import { ref } from 'vue';
import NiWrapper from '@/components/NiWrapper';

export default {
  name: 'TabComponent',
  components: {
    NiWrapper
  },
  setup() {
    const curTab = ref(0);
    const tabsList = ref([
      {
        icon: 'sf',
        desc:
            'SegmentFault 思否是中国领先的开发者技术社区。我们以技术问答、技术专栏、技术课程、技术资讯为核心的产品形态，为开发者提供纯粹、高质的技术交流平台。',
        link: 'https://segmentfault.com/u/lidalei'
      },
      {
        icon: 'github',
        desc:
            'GitHub 是一个面向开源及私有软件项目的托管平台，帮助开发者存储和管理其项目源代码，且能够追踪、记录并控制用户对其代码的修改。',
        link: 'https://segmentfault.com/u/lidalei'
      },
      {
        icon: 'wesing',
        desc:
            '全民K歌，一款用于娱乐的音乐向软件，平时没事干的时候会去唱两句，算是我为数不多的爱好之一。“话你都唔信，其实我把声都几似Leslie嘅喔”',
        link: 'https://kg.qq.com/node/personal?uid=619894872c2d318237'
      },
      {
        icon: 'leetcode',
        desc:
            '力扣 (LeetCode) 全球极客挚爱的技术成长平台。海量技术面试题库，拥有算法、数据结构、系统设计等 1000+题目，帮助你高效提升编程技能。',
        link: 'https://leetcode-cn.com/u/lee-lei/'
      }
    ]);

    return {
      curTab,
      tabsList
    };
  }
};
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  justify-content: space-between;
  .ni-wrapper {
    width: 60px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    color: #b5bcc9;
    transition: all ease 0.5s;
    &--active {
      color: #3fa1ee;
      box-shadow: 2px 2px 5px #dbdddf, -2px -2px 5px #f8f8f8,
        inset 2px 2px 5px #ced2d6, inset -2px -2px 5px #ffffff !important;
    }
  }
  &-desc {
    padding: 10px;
    font-size: 14px;
    margin-top: 20px;
    p {
      text-align: justify;
    }
    &-link {
      color: #3fa1ee;
      font-weight: 500;
      margin-top: 10px;
    }
  }
}
</style>
