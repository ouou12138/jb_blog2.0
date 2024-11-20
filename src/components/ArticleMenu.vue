<template>
  <ul class="menu" v-if="menuList.length > 0">
    <li class="menu-title">目录</li>
    <li
        v-for="(item, index) in menuList"
        :class="
        `menu-item menu-item--lv${item.level} ${
          item.highlight ? 'menu-item--act' : ''
        }`
      "
        :key="index"
        @click="handleMenuClick(item.text)"
    >
      <span>{{ item.text }}</span>
    </li>
  </ul>
</template>

<script>
import { ref, reactive, onMounted, onUnmounted, watch, defineComponent } from 'vue';
import VueScrollTo from 'vue-scrollto';

export default defineComponent({
  name: 'ArticleMenu',
  props: {
    menuKey: {
      type: Number
    }
  },
  setup(props) {
    const scrollCb = ref(null);
    const menuList = ref([]);
    const maxCount = 3;

    const reload = () => {
      let count = 1;
      const timer = setInterval(() => {
        if (count > maxCount) {
          clearInterval(timer);
        } else {
          count++;
          menuList.value = [];
          createMenu();
        }
      }, 1000);
    };

    const handleMenuClick = (id) => {
      id = id.trim().replace(/\./g, '').replace(/\s/g, '-').toLowerCase();
      const ele = document.getElementById(id);
      const options = {
        container: 'body',
        easing: 'ease',
        onDone: menuHighlight,
        y: true
      };
      VueScrollTo.scrollTo(ele, 800, options);
    };

    const debounce = (fn, delay) => {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
      };
    };

    const createMenu = () => {
      const root = document.querySelector('.markdown-body');
      if (root) traversalUsingNodeIterator(root);
    };

    const traversalUsingNodeIterator = (node) => {
      const iterator = document.createNodeIterator(
          node,
          NodeFilter.SHOW_ELEMENT,
          {
            acceptNode: (node) =>
                node.nodeName.startsWith('H')
                    ? NodeFilter.FILTER_ACCEPT
                    : NodeFilter.FILTER_REJECT
          }
      );

      let currentNode = iterator.nextNode();
      while (currentNode) {
        const level = parseInt(currentNode.tagName.substring(1));
        if (level >= 1 && level <= 4) {
          menuList.value.push({
            level,
            text: currentNode.innerText.replace('#', ''),
            offsetH: currentNode.offsetTop,
            highlight: false
          });
        }
        currentNode = iterator.nextNode();
      }
    };

    const menuHighlight = () => {
      const sTop = document.documentElement.scrollTop || document.body.scrollTop;
      for (let i = 0; i < menuList.value.length; i++) {
        const isLast = i === menuList.value.length - 1;
        const inRange =
            sTop >= menuList.value[i].offsetH &&
            (isLast || sTop < menuList.value[i + 1].offsetH);
        menuList.value[i].highlight = inRange;
      }
    };

    onMounted(() => {
      scrollCb.value = debounce(menuHighlight, 50);
      window.addEventListener('scroll', scrollCb.value);
    });

    onUnmounted(() => {
      if (scrollCb.value) {
        window.removeEventListener('scroll', scrollCb.value);
      }
    });

    watch(
        () => props.menuKey,
        () => {
          createMenu();
          reload();
        }
    );

    return {
      menuList,
      handleMenuClick
    };
  }
});
</script>


<style scoped lang="scss">
.menu {
  position: fixed;
  margin-top: 20px;
  margin-left: 15px;
  width: 240px;
  &-title {
    font-size: 20px;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 5px;
    margin-bottom: 10px;
  }
  &-item {
    margin: 3px 0;
    cursor: pointer;
    transition: all ease 0.3s;
    span {
      position: relative;
    }
    &:hover {
      span::after {
        content: "👀";
        right: -30px;
        font-size: 13px;
        position: absolute;
      }
      text-decoration: underline;
    }
    &--act {
      span::after {
        content: "👀";
        right: -30px;
        font-size: 13px;
        position: absolute;
      }
      text-decoration: underline;
      font-weight: bold;
    }
  }
  &-item--lv2 {
    padding-left: 1em;
  }
  &-item--lv3 {
    padding-left: 2em;
  }
  &-item--lv4 {
    padding-left: 3em;
  }
}
</style>
