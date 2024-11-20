<template>
  <div class="article section" id="article">
    <div class="article-left">
      <transition name="article-body">
        <div class="article-body" v-if="articleInfo.title">
          <header class="article-header">
            <h1 class="article-title">{{ articleInfo.title }}</h1>
            <ul class="article-meta">
              <li class="article-meta-li">
                <svg-icon iconClass="icon-clock"/>
                发表时间: {{ format(articleInfo.createdAt) }}
              </li>
              <li class="article-meta-li">
                <svg-icon iconClass="icon-update"/>
                更新时间: {{ format(articleInfo.updatedAt) }}
              </li>
              <li class="article-meta-li">
                <svg-icon iconClass="icon-eye"/>
                阅读数({{ articleInfo.readCount }})
              </li>
            </ul>
          </header>
          <div class="article-content" v-highlight v-if="articleInfo.content">
            <markdown :source="articleInfo.content"/>
          </div>
          <div class="article-suspended">
            <div
                :class="`suspended-item ${alreadyLike ? 'suspended-item--act' : ''}`"
                :badge="articleInfo.likeCount"
                @click="likeArticle"
            >
              <svg-icon iconClass="icon-like"/>
            </div>
            <div
                class="suspended-item"
                :badge="commentCount"
                @click="handleJumpToComment"
            >
              <svg-icon iconClass="icon-comment"/>
            </div>
          </div>
        </div>
      </transition>
      <div class="article-comment" v-if="showComment">
        <comment :count.sync="commentCount"/>
      </div>
    </div>
    <div class="article-right">
      <transition name="article-menu">
        <article-menu class="article-menu" :menuKey="menuKey"/>
      </transition>
    </div>
    <order-dialog/>
  </div>
</template>

<script>
import {ref, onMounted} from 'vue';
import dayjs from 'dayjs';
import VueScrollTo from 'vue-scrollto';
import ArticleMenu from '@/components/ArticleMenu';
import Markdown from '@/components/Markdown';
import Comment from '@/components/Comment';
import OrderDialog from '@/components/OrderDialog';

export default {
  name: 'Article',
  components: {
    Markdown,
    ArticleMenu,
    Comment,
    OrderDialog,
  },
  setup() {
    // 状态管理
    const menuKey = ref(1);
    const alreadyLike = ref(false);
    const showComment = ref(false);
    const commentCount = ref(0);
    const articleInfo = ref({content: ''});

    // 格式化时间
    const format = (timestamp) => dayjs(timestamp * 1000).format('YYYY-MM-DD');

    // 初始化数据加载
    const initLoadData = () => {
      $loading.show();
      setTimeout(() => {
        getArticleById();
      }, 1000);
      readArticle();
    };

    // 跳转到评论区域
    const handleJumpToComment = () => {
      const ele = document.getElementById('HI');
      const options = {
        container: 'body',
        easing: 'ease',
      };
      VueScrollTo.scrollTo(ele, 800, options);
    };

    // 获取文章详情
    const getArticleById = async () => {
      try {
        const data = await $api.getArticleById({
          params: {id: $route.params.id},
        });
        $loading.hideBefore(() => {
          articleInfo.value = data;
        });
        setTimeout(() => {
          menuKey.value++;
          showComment.value = true;
        }, 500);
      } catch (error) {
        $toast.error(error.message || '获取文章失败');
      }
    };

    // 点赞文章
    const likeArticle = async () => {
      if (alreadyLike.value) return;

      try {
        await $api.likeArticle({
          params: {id: $route.params.id},
        });
        alreadyLike.value = true;
        localStorage.info =
            localStorage.info === undefined
                ? `#${$route.params.id}_like;`
                : localStorage.info + `#${$route.params.id}_like;`;
        articleInfo.value.likeCount += 1;
      } catch (error) {
        $toast.error('点赞失败，请稍后重试');
      }
    };

    // 阅读文章
    const readArticle = async () => {
      try {
        await $api.readArticle({
          params: {id: $route.params.id},
        });
      } catch (error) {
        console.error('记录阅读失败', error);
      }
    };

    // 生命周期钩子
    onMounted(() => {
      initLoadData();
      if (
          localStorage.info &&
          localStorage.info.includes(`#${$route.params.id}_like`)
      ) {
        alreadyLike.value = true;
      }
    });

    return {
      menuKey,
      alreadyLike,
      showComment,
      commentCount,
      articleInfo,
      format,
      handleJumpToComment,
      getArticleById,
      likeArticle,
      readArticle,
    };
  },
};
</script>

<style scoped lang="scss">
.article {
  background-color: transparent;
  display: flex;
  align-items: flex-start;

  &-body {
    &-enter-active {
      transition: all ease 0.5s;
    }

    &-enter {
      opacity: 0;
      transform: translateY(20px);
    }
  }

  &-left {
    flex: 1;
    border-left: 1px solid #efefef;
    border-right: 1px solid #efefef;
    background-color: #fff;
  }

  &-right {
    width: 240px;
    margin-left: 15px;
  }

  &-header {
    padding: 40px 20px 20px;
    margin-bottom: 30px;
  }

  &-title {
    font-size: 36px;
  }

  &-meta {
    display: flex;
    align-items: center;

    &-li {
      margin-right: 20px;
      font-size: 13px;
      color: #999;
    }
  }

  &-tag {
    user-select: none;
    margin-right: 5px;
    padding: 2px 3px 4px;
    font-size: 12px;
    color: #fff;
    color: #fff;
    background-color: #999;
    border-radius: 2px;
    transform: scale(0.9);
  }

  &-content {
    padding: 0 20px 20px;
  }

  &-comment {
    margin-top: 80px;
    padding: 0 20px;
  }

  &-menu {
    animation: menuFadeIn 0.8s ease;

    &-enter-active,
    &-leave-active {
      transition: all ease 0.5s;
    }

    &-enter,
    &-leave-to {
      opacity: 0;
      transform: translateY(-20px);
    }
  }

  &-suspended {
    position: fixed;
    top: 70px;
    margin-left: -80px;
    display: flex;
    flex-direction: column;
  }

  @keyframes menuFadeIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
}

.suspended {
  &-item {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 44px;
    height: 44px;
    margin-bottom: 15px;
    border-radius: 100%;
    border: 1px solid #e5e5e5;
    transition: all ease 0.5s;
    cursor: pointer;

    .svg-icon {
      font-size: 20px;
      color: #999;
      transition: all ease 0.5s;
    }

    &:hover {
      border-color: brown;

      .svg-icon {
        color: brown;
        transform: scale(1.2);
      }

      &::after {
        background-color: brown;
      }
    }

    &--act {
      border-color: brown;
    }

    &--act .svg-icon {
      color: brown;
    }

    &--act::after {
      background-color: brown !important;
    }

    &::after {
      content: attr(badge);
      display: inline-block;
      position: absolute;
      top: -2px;
      right: -5px;
      color: #fff;
      padding: 2px 5px 3px;
      line-height: 1;
      border-radius: 20px;
      background-color: #b9b9b9;
      font-size: 12px;
      transform: scale(0.75);
      transition: all ease 0.5s;
    }
  }
}
</style>
